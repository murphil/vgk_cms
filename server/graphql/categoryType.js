const _ = require('ramda')
const {
  GraphQLObjectType
  , GraphQLBoolean
  , GraphQLString
  , GraphQLInt
  , GraphQLList
  , GraphQLNonNull
} = require('graphql')
const GraphQLJSON = require('graphql-type-json')
const scm = require('../database/const.yml.json').SCHEMA
const K = require('../database/knexConnection')
const treeEach = require('../../utils/treeMap').treeEach
const {articleType} = require('./articleType')
const {fetchStylesheet} = require('./resourceType')
let T = scm.CONTENT
let A = T.ARTICLE
let C = T.CATEGORY
let U = scm.USER.USER

let categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    [C.ID]: {type: GraphQLInt},
    [C.PID]: {type: GraphQLInt},
    [C.NAME]: {type: GraphQLString},
    [C.URI]: {type: GraphQLString},
    [C.HID]: {type: GraphQLBoolean},
    [C.WEIGHT]: {type: GraphQLInt},
  }
})

let contentType = new GraphQLObjectType({
  name: 'Content',
  fields: {
    [C.CONTENT]: {type: GraphQLJSON}
  }
})

let contentCollectionType = new GraphQLObjectType({
  name: 'ContentCollection',
  fields: {
    [C.PAGECONTENT]: {
      type: GraphQLJSON
    },
    [C.ARTICLELST]: {
      type: new GraphQLList(articleType)
    },
    [C.STYLESHEET]: {
      type: GraphQLJSON
    }
  }
})

let fetchCategoryResources = async queryParams  => {
  // 根据栏目ID，查询栏目的页面内容 返回JSON表示的树
  let initContentRes = await K(C._).select(C.CONTENT).where(C.URI, queryParams[A.CURI])
  let initContent = initContentRes[0][C.CONTENT]
  // 在页面内容中查找其他栏目列表
  let categoryUri = []
  treeEach(initContent, (node, parent) => {
    if (node.type === 'categoryList') {
      // 如果category-list类型中的 category 为 null，则查询当前栏目
      let uri = node['category_uri'] === null ? queryParams[A.CURI] : node['category_uri']
      categoryUri.push(uri)
    }
  })
  // 根据上一步查找出来的列表，把对应栏目中的内容找出来
  // 按照栏目排序，并未分组。 分组由客户端实现
  // 因为要限制每个栏目的查询数量，所以使用窗口函数
  let articleListQ = K.raw(`
                      SELECT
                        *
                      FROM (
                             SELECT
                               ROW_NUMBER() OVER (PARTITION BY c.${C.URI} ORDER BY a.${A.UTS} DESC) AS r,
                               c.${C.URI} AS ${A.CURI},
                               a.${A.TITLE}, a.${A.CONTENT}, a.${A.URI},
                               u.${U.NAME} AS ${A.AUTHOR},
                               a.${A.CTS}, a.${A.UTS}
                             FROM
                               "${C._}" AS c
                               INNER JOIN "${A._}" AS a
                                 ON c.${C.ID} = a.${A.CID}
                               LEFT OUTER JOIN ${U._} AS u
                                 ON a.${A.AUTHOR} = u.${U.ID}
                             WHERE c.${C.URI} = ANY(?)
                                  AND  a.${A.HID} ISNULL 
                               ) x
                      WHERE
                        x.r <= ?
                       `, [categoryUri, queryParams[C.ArticleLimit] || 6])
  let articleList = (await articleListQ).rows
  // 查找 stylesheet 内容
  let styleSheet = fetchStylesheet(initContent, queryParams[C.STYLESHEET], queryParams[C.CurrentLayout])
  // 返回页面内容及其所依赖栏目中的文章
  let res = {
    [C.PAGECONTENT]: initContent,
    [C.ARTICLELST]: articleList,
    [C.STYLESHEET]: styleSheet
  }
  return res
}

// 获取页面所需资源
let contentCollect = {
  type: contentCollectionType,
  args: {
    [C.ID] : {type: GraphQLInt},
    [A.CURI] : {type: GraphQLString},
    [A.URI] : {type: GraphQLString},
    [C.STYLESHEET]: {type: GraphQLString},
    [C.CurrentLayout]: {type: GraphQLString},
    [C.ArticleLimit]: {type: GraphQLInt}
  },
  resolve: async(root, x) => {
    // 查询参数中是否带有文章Uri参数。如果有并且不为空字符串，则是查询文章；否则是查询栏目
    let aUri = scm.CONTENT.ARTICLE.URI
    if(x[aUri] && x[aUri].length > 0) {
      let query = K.raw(`
                 SELECT a.${A.ID}, c.${C.URI} AS ${A.CURI}, a.${A.URI}
                      , a.${A.TITLE}, u.${U.NAME} AS ${A.AUTHOR}
                      , a.${A.CTS}, a.${A.UTS}
                      , a.${A.CONTENT} AS ${A.CONTENT}
                 FROM ${A._} AS a
                   INNER JOIN ${C._} AS c
                     ON a.${A.CID} = c.${C.ID}
                   LEFT OUTER JOIN ${U._} AS u
                     ON a.${A.AUTHOR} = u.${U.ID}
                 WHERE
                   a.${A.HID} ISNULL
                   AND a.${A.URI} = ?
                   AND c.${C.URI} = ?
                 ;`, [x[aUri], x[A.CURI]])
      let res = (await query).rows[0]
      res['type'] = 'Article'
      // 查找 stylesheet 内容
      let styleSheet = fetchStylesheet(res, x[C.STYLESHEET], x[C.CurrentLayout])
      return {
        [C.PAGECONTENT]: res,
        [C.ARTICLELST]: [],
        [C.STYLESHEET]: styleSheet
      }
    } else {
      return await fetchCategoryResources(x)
    }
  }
}

// 在栏目树上获取子树的列表
// TODO: MySQL需改为嵌套集实现
let categoryQuery = {
  type: new GraphQLList(categoryType),
  args: {
    [C.ID] : { type: GraphQLInt},
    [C.NAME] : {type: GraphQLString},
    [C.URI] : {type: GraphQLString}
  },
  resolve: async (root, x, ...rest) => {
    let q = Object.assign(x, {[C.URI]: C.MainUri})
    let {_:TABLE, ID, PID, NAME, URI, HID, WEIGHT} = C
    let resQ = K.raw(`
               WITH RECURSIVE downward AS (
                 SELECT c.${ID}, c.${PID}, c.${NAME}, c.${URI}, c.${WEIGHT}
                   FROM "${TABLE}" AS c
                   WHERE ${URI} = ?
               UNION ALL
                 SELECT u.${ID}, u.${PID}, u.${NAME}, u.${URI}, u.${WEIGHT}
                   FROM "${TABLE}" AS u
                   INNER JOIN downward ON downward.${ID} = u.${PID}
                   WHERE u.${HID} ISNULL
               ) SELECT * FROM downward
               ;
               `, [q[URI]])
    return (await resQ).rows
  }
}

module.exports = {
  categoryType, categoryQuery, contentCollect
}
