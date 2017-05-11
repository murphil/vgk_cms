import Main from './components/Main.vue'
import NotFound from './components/404'
import Test from './components/test'


export default [{
  path: '/',
  component: Main
}, {
  path: '/test',
  component: Test
},{
  path: '/time-entries',
  component: Main,
  children: [{
    path: 'log-time',
    component: NotFound,
  }]
}, {
  path: '*',
  component: Main
}];
