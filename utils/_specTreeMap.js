let example = [{"name":"主页","uri":"home","id":1,"parent_id":null},
  {"name":"曹 睿渊","uri":"Universal","id":2,"parent_id":1},
  {"name":"黄 绍齐","uri":"tan","id":3,"parent_id":1},
  {"name":"Dr. 吕 梓晨","uri":"Car","id":4,"parent_id":1},
  {"name":"彭 雪松","uri":"Car","id":5,"parent_id":1},
  {"name":"朱 智宸","uri":"Bike","id":6,"parent_id":1},
  {"name":"万 烨霖","uri":"Total","id":7,"parent_id":2},
  {"name":"汪 哲瀚","uri":"Cotton","id":8,"parent_id":2},
  {"name":"Mr. 宋 伟泽","uri":"中心","id":9,"parent_id":2},
  {"name":"万 语堂","uri":"Incredible","id":10,"parent_id":2},
  {"name":"莫 立果","uri":"incubate","id":11,"parent_id":2},
  {"name":"钟 哲瀚","uri":"Graphic Interface","id":12,"parent_id":3},
  {"name":"萧 擎苍 I","uri":"withdrawal","id":13,"parent_id":3},
  {"name":"Dr. 黄 泽洋","uri":"harness","id":14,"parent_id":3},
  {"name":"Ms. 林 子轩","uri":"Practical Plastic Towels","id":15,"parent_id":3},
  {"name":"杜 弘文 DVM","uri":"Salad","id":16,"parent_id":3},
  {"name":"白 聪健","uri":"Health","id":17,"parent_id":4},
  {"name":"罗 瑞霖","uri":"宁夏","id":18,"parent_id":4},
  {"name":"熊 立辉","uri":"system engine","id":19,"parent_id":4},
  {"name":"韩 建辉","uri":"Accountability","id":20,"parent_id":4},
  {"name":"Miss 唐 明杰","uri":"Rubber","id":21,"parent_id":4},
  {"name":"于 烨霖","uri":"input","id":22,"parent_id":5},
  {"name":"洪 浩轩","uri":"Borders","id":23,"parent_id":5},
  {"name":"唐 涛","uri":"Berkshire","id":24,"parent_id":5},
  {"name":"周 鸿煊","uri":"HTTP","id":25,"parent_id":5},
  {"name":"梁 泽洋","uri":"Cheese","id":26,"parent_id":5},
  {"name":"郑 绍齐 Jr.","uri":"Computer","id":27,"parent_id":6},
  {"name":"Ms. 方 越彬","uri":"XSS","id":28,"parent_id":6},
  {"name":"萧 智辉","uri":"syndicate","id":29,"parent_id":6},
  {"name":"许 语堂","uri":"Avon","id":30,"parent_id":6},
  {"name":"许 语堂","uri":"Avon","id":32,"parent_id":30},
  {"name":"金 笑愚","uri":"initiatives","id":31,"parent_id":6}]
let tree = {"name":"主页","uri":"home","id":1,"parent_id":null,
  children:[
    {"name":"曹 睿渊","uri":"Universal","id":2,"parent_id":1},
    {"name":"黄 绍齐","uri":"tan","id":3,"parent_id":1,
      children:[
        {"name":"萧 擎苍 I","uri":"withdrawal","id":13,"parent_id":3},
        {"name":"Dr. 黄 泽洋","uri":"harness","id":14,"parent_id":3},
        {"name":"Ms. 林 子轩","uri":"Practical Plastic Towels","id":15,"parent_id":3}
      ]
    },
    {"name":"Dr. 吕 梓晨","uri":"Car","id":4,"parent_id":1}
  ]}

buildTree(example)
let m = treeMap(tree,(i,p)=>({name: i.name, p: p&&p.name}))
treeEach(tree,(i,p)=>({name: i.name, p: p&&p.name}))
