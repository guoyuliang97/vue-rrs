import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component:resolve=>require(['@/components/Home'],resolve),
      beforeEnter: (to, from, next) => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(flag) {
          next({
            path: '/index'
          })
        }
        next();
      },
      meta:{title:'人人耍'}
    },
    {
      path: '/index',
      name: 'index',
      component:resolve=>require(['@/components/mobile/index'],resolve),
      beforeEnter: (to, from, next) => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(!flag) {
          next({
            path: '/'
          })
        }
        next();
      },
      meta:{title:'人人耍'}
    },
    {
      path: '/logion',
      name: 'logion',
      component:resolve=>require(['@/components/logion'],resolve),
      meta: { title:'登陆'}
    },
		{
			path: '/userdata',
			name: 'userdata',
			component: resolve=>require(['@/components/edit/userdata'],resolve),
      meta:{
			  requireAuth:true,
        title:"个人资料"
      }
		},
		{
			path: '/helphome',
			name: 'Helphome',
			component: resolve=>require(['@/components/helphome'],resolve),
      meta: { title:'帮助'}
		},
		{
			path: '/terms',
			name: 'terms',
			component: resolve=>require(['@/components/terms'],resolve),
			redirect:'/policy',
			children:[
				{
					path: '/policy',
					name: 'Policy',
					component: resolve=>require(['@/components/terms/policy'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-1',
					name: 'Policy1-1',
					component: resolve=>require(['@/components/terms/policy1-1'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-2',
					name: 'Policy1-2',
					component: resolve=>require(['@/components/terms/policy1-2'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-3',
					name: 'Policy1-3',
					component: resolve=>require(['@/components/terms/policy1-3'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-4',
					name: 'Policy1-4',
					component: resolve=>require(['@/components/terms/policy1-4'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-5',
					name: 'Policy1-5',
					component: resolve=>require(['@/components/terms/policy1-5'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-6',
					name: 'Policy1-6',
					component: resolve=>require(['@/components/terms/policy1-6'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-7',
					name: 'Policy1-7',
					component: resolve=>require(['@/components/terms/policy1-7'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-8',
					name: 'Policy1-8',
					component: resolve=>require(['@/components/terms/policy1-8'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-10',
					name: 'Policy1-10',
					component: resolve=>require(['@/components/terms/policy1-10'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-11',
					name: 'Policy1-11',
					component: resolve=>require(['@/components/terms/policy1-11'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-12',
					name: 'Policy1-12',
					component: resolve=>require(['@/components/terms/policy1-12'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-13',
					name: 'Policy1-13',
					component: resolve=>require(['@/components/terms/policy1-13'],resolve),
          meta: { title:'政策'}
				},
				{
					path: '/policy1-14',
					name: 'Policy1-14',
					component: resolve=>require(['@/components/terms/policy1-14'],resolve),
          meta: { title:'政策'}
				},
        {
          path: '/terms1-1',
          name: 'terms1-1',
          component:resolve=>require(['@/components/terms/terms1-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms1-2',
          name: 'terms1-2',
          component: resolve=>require(['@/components/terms/terms1-2'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms2-1',
          name: 'terms2-1',

          component: resolve=>require(['@/components/terms/terms2-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms2-3',
          name: 'terms2-3',
          component: resolve=>require(['@/components/terms/terms2-3'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms2-4',
          name: 'terms2-4',
          component: resolve=>require(['@/components/terms/terms2-4'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms3-1',
          name: 'terms3-1',
          component: resolve=>require(['@/components/terms/terms3-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms3-2',
          name: 'terms3-2',
          component: resolve=>require(['@/components/terms/terms3-2'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms3-3',
          name: 'terms3-3',
          component: resolve=>require(['@/components/terms/terms3-3'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms3-4',
          name: 'terms3-4',
          component: resolve=>require(['@/components/terms/terms3-4'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms4-1',
          name: 'terms4-1',
          component: resolve=>require(['@/components/terms/terms4-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms4-2',
          name: 'terms4-2',
          component: resolve=>require(['@/components/terms/terms4-2'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms5-1',
          name: 'terms5-1',
          component: resolve=>require(['@/components/terms/terms5-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms5-2',
          name: 'terms5-2',
          component: resolve=>require(['@/components/terms/terms5-2'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms5-3',
          name: 'terms5-3',
          component: resolve=>require(['@/components/terms/terms5-3'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms6-1',
          name: 'terms6-1',
          component: resolve=>require(['@/components/terms/terms6-1'],resolve),
          meta: { title:'政策'}
        },
        {
          path: '/terms7-1',
          name: 'terms7-1',
          component: resolve=>require(['@/components/terms/terms7-1'],resolve),
          meta: { title:'政策'}
        }
			],

		},
		{
			path: '/account',
			name: 'Account',
			component: resolve=>require(['@/components/account'],resolve),
			redirect: to=>{
			  var store = localStorage.getItem('rt')
        if(store){
          return '/'+store
        }else{
          return '/notice'
        }
      },
			children:[
				{
					path: '/notice',
					name: 'Notice',
					component: resolve=>require(['@/components/account/notice'],resolve),
      meta:{
        requireAuth:true,
        title:'通知'
      }
				},
				{
					path: '/collection',
					name: 'Collection',
					component: resolve=>require(['@/components/account/collection'],resolve),
          meta:{
            requireAuth:true,
            title:'收款方式'
          }
				},
				{
					path: '/security',
					name: 'Security',
					component: resolve=>require(['@/components/account/security'],resolve),
          meta:{
            requireAuth:true,
            title:'安全'
          }
				},
				{
					path: '/setting',
					name: 'Setting',
					component: resolve=>require(['@/components/account/setting'],resolve),
          meta:{
            requireAuth:true,
            title:'设置'
          }
				},
				{
					path: '/badge',
					name: 'Badge',
					component: resolve=>require(['@/components/account/badge'],resolve),
          meta:{
            requireAuth:true,
            title:'徽章'
          }
				}
			]
		},
		{
			path: '/travelfunds',
			name: 'Travelfunds',
			component: resolve=>require(['@/components/travelfunds'],resolve),
      meta:{
        requireAuth:true,
        title:'旅行基金'
      }
		},
		{
			path: '/edit',
			name: 'Edit',
			component: resolve=>require(['@/components/edit'],resolve),
			redirect:'/editdata',
			children:[
				{
					path: '/editdata',
					name: 'Editdata',
					component: resolve=>require(['@/components/edit/editdata'],resolve),
          meta:{
            requireAuth:true,
            title:'编辑个人资料'
          }
				},
				{
					path: '/editphoto',
					name: 'Editphoto',
					component: resolve=>require(['@/components/edit/editphoto'],resolve),
          meta:{
            requireAuth:true,
            title:'照片/头像'
          }
				},
				{
					path: '/editcheck',
					name: 'Editcheck',
					component: resolve=>require(['@/components/edit/editcheck'],resolve),
          meta:{
            requireAuth:true,
            title:'信任与验证'
          }
				},
			]
		},
		{
			path: '/story',
			name: 'Story',
			component: resolve=>require(['@/components/story'],resolve),
			redirect:'/wonderful',
			children:[
				{
					path: '/wonderful',
					name: 'Wonderful',
					component: resolve=>require(['@/components/story/wonderful'],resolve),
          meta:{ title:'精选故事'}
				},
				{
					path: '/outdoor',
					name: 'Outdoor',
					component: resolve=>require(['@/components/story/outdoor'],resolve),
          meta:{ title:'户外活动'}
				},
				{
					path: '/ethnic',
					name: 'Ethnic',
					component: resolve=>require(['@/components/story/ethnic'],resolve),
          meta:{ title:'少数民族'}
				},
				{
					path: '/local',
					name: 'Local',
					component: resolve=>require(['@/components/story/local'],resolve),
          meta:{ title:'本土文化'}
				}
			]
		},
		{
			path: '/experience',
			name: 'Experience',
			component: resolve=>require(['@/components/experience'],resolve),
			redirect:'/language',
			children:[
				{
					path:'/language',
					name:'Language',
					component:resolve=>require(['@/components/experience/language'],resolve),
          meta:{
            requireAuth:true,
            title: '语言'
          }
				},
				{
					path:'/type',
					name:'Type',
					component:resolve=>require(['@/components/experience/type'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '类别'
          }
				},
				{
					path:'/introduce',
					name:'Introduce',
					component:resolve=>require(['@/components/experience/introduce'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '介绍您自己'
          }
				},
				{
					path:'/feel',
					name:'Feel',
					component:resolve=>require(['@/components/experience/feel'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '体验内容'
          }
				},
				{
					path:'/feeladdress',
					name:'Feeladdress',
					component:resolve=>require(['@/components/experience/feelAddress'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '体验地点'
          }
				},
				{
					path:'/provide',
					name:'Provide',
					component:resolve=>require(['@/components/experience/provide'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '我会提供什么'
          }
				},
				{
					path:'/bring',
					name:'Bring',
					component:resolve=>require(['@/components/experience/bring'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '参与者需要自带的东西'
          }
				},
				{
					path:'/title',
					name:'Title',
					component:resolve=>require(['@/components/experience/title'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '标题'
          }
				},
				{
					path:'/photo',
					name:'Photo',
					component:resolve=>require(['@/components/experience/photo'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '照片'
          }
				},
      {
        path: '/activeTime',
        name: 'activeTime',
        component:resolve=>require(['@/components/experience/activeTime'],resolve),
        redirect: to=>{
          var store = localStorage.getItem('Time')
          if(store){
            return '/'+store
          }else{
            return '/Ltime'
          }
        },
        children:[
          {
            path: '/Ltime',
            name: 'Ltime',
            component:resolve=>require(['@/components/experience/Ltime'],resolve),
            meta:{
              requireAuth:true,
              requireData:true,
              title: '举办多天活动'
            }
          },
          {
            path: '/moreTime',
            name: 'moreTime',
            component: resolve=>require(['@/components/experience/moreTime'],resolve),
            meta:{
              requireAuth:true,
              requireData:true,
              title: '举办单天活动'
            }
          }
        ]
      },
      {
          path: '/attation',
          name: 'attation',
          component:resolve=>require(['@/components/experience/attation'],resolve),
        meta:{
          requireAuth:true,
          requireData:true,
          title: '注意事项'
        }
      },
        {
          path: '/bookSet',
          name: 'bookSet',
          component:resolve=>require(['@/components/experience/bookSet'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '预定设置'
          }
        },
        {
          path: '/makeBlock',
          name: 'makeBlock',
          component:resolve=>require(['@/components/experience/makeBlock'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '体验包场'
          }
        },
        {
          path: '/accommodation',
          name: 'accommodation',
          component: resolve=>require(['@/components/experience/accommodation'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '是否提供住宿'
          }
        },
        {
          path:'/subExperience',
          name:'subExperience',
          component: resolve=>require(['@/components/experience/subExperience'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '提交体验'
          }
        },
        {
          path: '/needVolunter',
          name: 'needVolunter',
          component: resolve=>require(['@/components/experience/needVolunter'],resolve),
          meta:{
            requireAuth:true,
            requireData:true,
            title: '志愿者'
          }
        }
			]
		},
    {
      path: '/about',
      name: 'about',
      component:resolve=>require(['@/components/information/about'],resolve),
      meta: {title:'关于我们'}
    },
    {
      path: '/activities',
      name: 'activities',
      component:resolve=>require(['@/components/information/activities'],resolve),
      meta: {title:'为何开展活动'}
    },
    {
      path: '/hospitality',
      name: 'hospitality',
      component:resolve=>require(['@/components/information/hospitality'],resolve),
      redirect: '/basic',
      children:[
        {
          path: '/basic',
          name: 'basic',
          component:resolve=>require(['@/components/information/basic'],resolve),
        },
        {
          path: '/evaluation',
          name: 'evaluation',
          component:resolve=>require(['@/components/information/evaluation'],resolve),
        },
        {
          path: '/religious',
          name: 'religious',
          component: resolve=>require(['@/components/information/religious'],resolve),
        }
      ]
    },
    {
      path: '/whyVolunteer',
      name: 'whyVolunteer',
      component:resolve=>require(['@/components/information/whyVolunteer'],resolve),
      meta: {title:'为何做志愿者'}
    },
    {
      path: '/privacyS',
      name: 'privacyS',
      component:resolve=>require(['@/components/information/privacyS'],resolve),
      meta: {title:'隐私政策'}
    },
    {
      path: '/siteMap',
      name: 'siteMap',
      component:resolve=>require(['@/components/information/siteMap'],resolve),
      meta: {title:'网站地图'}
    },
    {
      path: '/volunteerList',
      name: 'volunteerList',
      component:resolve=>require(['@/components/volunteerList'],resolve),
      meta: {title:'志愿者'}
    },
    {
      path: '/publishPage',
      name: 'publishPage',
      component:resolve=>require(['@/components/childPages/publishPage'],resolve),
    },
    {
      path: '/storyPage',
      name: 'storyPage',
      component:resolve=>require(['@/components/childPages/storyPage'],resolve),
      meta: {title: 'Allptp'}
    },
    {
      path: '/wish',
      name: 'wish',
      component:resolve=>require(['@/components/wish'],resolve),
      meta:{
        requireAuth:true,
        title: '心愿单'
      }
    },
    {
      path: '/jouerney',
      name: 'jouerney',
      component:resolve=>require(['@/components/jouerney'],resolve),
      meta:{
        requireAuth:true,
        title: '我的旅程'
      }
    },
    {
      path: '/storyPublish',
      name: 'storyPublish',
      component:resolve=>require(['@/components/childPages/storyPublish'],resolve),
      meta:{
        requireAuth:true,
        title: '创建我的故事'
      }
    },
    {
      path: '/message',
      name: 'message',
      component:resolve=>require(['@/components/message'],resolve),
      redirect:'/friend',
      children:[
        {
          path:'/friend',
          name:'friend',
          component:resolve=>require(['@/components/messagechild/friend'],resolve),
          meta:{
            requireAuth:true,
            title: '我的好友'
          }
        },
        { path:'/SystemMessage',
          name:'SystemMessage',
          component:resolve=>require(['@/components/messagechild/SystemMessage'],resolve),
          meta:{
            requireAuth:true,
            title: '系统消息'
          }
        },
        {
          path: '/friendsNotice',
          name: 'friendsNotice',
          component:resolve=>require(['@/components/messagechild/friendsNotice'],resolve),
          meta:{
            requireAuth:true,
            title: '好友通知'
          }
        },
        {
          path: '/friendMessage',
          name: 'friendMessage',
          component:resolve=>require(['@/components/messagechild/friendMessage'],resolve),
          meta:{
            requireAuth:true,
            title: '好友消息'
          }
        },
        {
          path:'/messagePage',
          name:'messagePage',
          component:resolve=>require(['@/components/messagechild/messagePage'],resolve),
          meta:{
            requireAuth:true,
            title: '系统消息'
          }
        },
        {
          path: '/editevaluation',
          name: 'Editevaluation',
          component: resolve=>require(['@/components/edit/editevaluation'],resolve),
          meta:{
            requireAuth:true,
            title: '评价'
          }
        },
        {
          path: '/zanMessage',
          name: 'zanMessage',
          component: resolve=>require(['@/components/messagechild/zanMessage'],resolve),
          meta:{
            requireAuth:true,
            title: '赞'
          }
        }
        ]
    },
    {
      path: '/order',
      name: 'order',
      component:resolve=>require(['@/public/order'],resolve),
      meta:{
        requireAuth:true,
        title: '预定时间'
      }
    },
    {
      path: '/choose',
      name: 'choose',
      component:resolve=>require(['@/components/choose'],resolve),
      meta:{
        requireAuth:true,
        title: '支付页面'
      }
    },

    {
      path: '/homeSearch',
      name: 'homeSearch',
      component:resolve=>require(['@/components/childPages/homeSearch'],resolve),
      meta:{title: '搜索'}
    },
    {
      path: '/wishPage',
      name: 'wishPage',
      component:resolve=>require(['@/components/childPages/wishPage'],resolve),
      meta:{
        requireAuth:true,
        title: '心愿单'
      }
    },
    {
      path: '/Disputes',
      name: 'Disputes',
      component:resolve=>require(['@/public/Disputes'],resolve),
      meta:{
        requireAuth:true,
        title: '问题反馈'
      }
    },
    {
      path: '/publishList',
      name: 'publishList',
      component:resolve=>require(['@/components/childPages/publishList'],resolve),
      meta:{
        requireAuth:true,
        title: '成为策划人'
      }
    },
    {
      path: '/storyList',
      name: 'storyList',
      component: resolve=>require(['@/components/childPages/storyList'],resolve),
      meta:{
        requireAuth:true,
        title: '创建故事'
      }
    },
    {
      path: '/authentication',
      name: 'authentication',
      component:resolve=>require(['@/public/authentication'],resolve),
      meta:{
        requireAuth:true,
        title:'身份验证'
      }
    },
    {
      path: '/moreActive',
      name: 'moreActive',
      component:resolve=>require(['@/public/moreActive'],resolve)
    },
 /*   {
      path: '/activeStep',
      name: 'activeStep',
      component: resolve=>require(['@/public/activeStep'],resolve)
    },*/
    {
      path: '/experienceCentre',
      name: 'experienceCentre',
      component: resolve=>require(['@/components/experienceCentre'],resolve),
      meta: {title: '体验中心'}
    },
 /*   {
      path: '/lianxi',
      name: 'lianxi',
      component: resolve=>require(['@/public/lianxi'],resolve)
    },*/
    {
      path: '/transaction',
      name: 'transaction',
      component: resolve=>require(['@/components/transaction'],resolve),
      redirect: to=>{
        var store = localStorage.getItem('dis')
        if(store){
          return '/'+ store
        }else{
          return '/records'
        }
      },
      children:[
        {
          path: '/records',
          name: 'records',
          component: resolve=>require(['@/components/edit/records'],resolve),
          meta:{
            requireAuth:true,
            title: '交易记录'
          }
        },
        {
          path: '/completeOrder',
          name: 'completeOrder',
          component: resolve=>require(['@/components/edit/completeOrder'],resolve),
          meta:{
            requireAuth:true,
            title: '已完成订单'
          }
        },
        {
          path: '/noComplete',
          name: 'noComplete',
          component: resolve=>require(['@/components/edit/noComplete'],resolve),
          meta:{
            requireAuth:true,
            title: '未完成订单'
          }
        },
        {
          path: '/orderFor',
          name: 'orderFor',
          component: resolve=>require(['@/components/edit/orderFor'],resolve),
          meta:{
            requireAuth:true,
            title: '交易记录'
          }
        },
        {
          path: '/stayOrder',
          name: 'stayOrder',
          component: resolve=>require(['@/components/edit/stayOrder'],resolve),
          meta:{
            requireAuth:true,
            title: '带体验订单'
          }
        },
        {
          path: '/refundOrder',
          name: 'refundOrder',
          component: resolve=>require(['@/components/edit/refundOrder'],resolve),
          meta:{
            requireAuth:true,
            title: '退款订单'
          }
        },
        {
          path: '/refund',
          name: 'refund',
          component: resolve=>require(['@/components/edit/refund'],resolve),
          meta:{
            requireAuth:true,
          }
        },
        {
          path: '/dispute',
          name: 'dispute',
          component: resolve=>require(['@/components/edit/dispute'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/goingOrder',
          name: 'goingOrder',
          component: resolve=>require(['@/components/edit/goingOrder'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/refundFor',
          name: 'refundFor',
          component: resolve=>require(['@/components/edit/refundFor'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/Orderevaluate',
          name: 'Orderevaluate',
          component: resolve=>require(['@/components/edit/Orderevaluate'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/withdrawal',
          name: 'withdrawal',
          component: resolve=>require(['@/components/edit/withdrawal'],resolve),
          meta:{
            requireAuth:true
          }
        }
      ]
    },
    {
      path: '/allHouse',
      name: 'allHouse',
      component: resolve=>require(['@/components/childPages/allHouse'],resolve),
      meta:{
        requireAuth:true,
        title: '预定房源'
      }
    },
    {
      path: '/myPlay',
      name: 'myPlay',
      component: resolve => require(['@/components/myPlay'], resolve),
      meta:{
        requireAuth:true,
        title: '我的策划'
      }
    },
    {
      path: '/continue',
      name: 'continue',
      component: resolve=>require(['@/components/player/continue'],resolve),
      meta:{
        requireAuth:true
      }
    },
   /* {
      path: '/publish',
      name: 'publish',
      component: resolve=>require(['@/components/player/publish'],resolve),
      meta:{
        requireAuth:true
      }
    },*/
   /* {
      path: '/abolish',
      name: 'abolish',
      component: resolve=>require(['@/components/player/abolish'],resolve),
      meta:{
        requireAuth:true
      }
    },*/
    {
      path: '/appliCation',
      name: 'appliCation',
      component: resolve=>require(['@/components/player/application'],resolve),
      meta:{
        requireAuth:true,
        title: '自愿者申请'
      }
    },
    {
      path: '/LookOrder',
      name: 'LookOrder',
      component: resolve=>require(['@/components/player/LookOrder'],resolve),
      meta:{
        requireAuth:true,
        title: '查看预定'
      }
    },
    {
      path: '/playerReturn',
      name: 'playerReturn',
      component: resolve=>require(['@/components/player/playerReturn'],resolve),
      meta:{
        requireAuth:true,
        title: '策划人退款'
      }
    },
    {
      path: '/refundPage',
      name: 'refundPage',
      component: resolve=>require(['@/components/player/refundPage'],resolve),
      meta:{
        requireAuth:true,
        title: '退款申请列表'
      }
    },
    {
      path:'/translation',
      name: 'translation',
      component: resolve=>require(['@/components/childPages/translation'],resolve),
      meta:{
        requireAuth:true,
        title: '查看翻译'
      }
    },
    {
      path: '/invitVolunter',
      name: 'invitVolunter',
      component: resolve=>require(['@/components/player/invitVolunter'],resolve),
      redirect:'/inviteList',
      children:[
        {
          path: '/inviteList',
          name:'inviteList',
          component: resolve=>require(['@/components/player/inviteList'],resolve),
          meta:{
            requireAuth:true,
            title: '邀请志愿者'
          }
        },
        {
          path: '/sucessInvit',
          name: 'sucessInvit',
          component: resolve=>require(['@/components/player/sucessInvit'],resolve),
          meta:{
            requireAuth:true,
            title:'已成功邀请志愿者'
          }
        }
      ]
    },
    {
      path: '/myWant',
      name: 'myWant',
      component: resolve=>require(['@/components/myWant'],resolve),
      redirect:'/palyerInvite',
      children:[
        {
          path: '/palyerInvite',
          name: 'palyerInvite',
          component: resolve => require(['@/components/volun/palyerInvite'], resolve),
          meta:{
            requireAuth:true,
            title: '策划者邀请'
          }
        },
        {
          path: '/myAplication',
          name: 'myAplication',
          component: resolve=>require(['@/components/volun/myAplication'],resolve),
          meta:{
            requireAuth:true,
            title: '我的志愿申请'
          }
        },
        {
          path: '/overInvite',
          name: 'overInvite',
          component: resolve=>require(['@/components/volun/overInvite'],resolve),
          meta:{
            requireAuth:true,
            title: '已完成志愿'
          }
        }
      ]
    },
    {
      path: '/refundDescirbe',
      name: 'refundDescirbe',
      component: resolve=>require(['@/components/player/refundDescirbe'],resolve),
      meta:{
        requireAuth:true,
        title: '预定详情'
      }
    },
    {
      path: '/classification',
      name: 'classification',
      component: resolve=>require(['@/components/childPages/classification'],resolve),
    },
    {
      path: '/fenleiPage',
      name: 'fenleiPage',
      component: resolve=>require(['@/components/childPages/fenleiPage'],resolve)
    },
 /*   {
      path: '/paizhao',
      name:'paizhao',
      component: resolve=>require(['@/public/paizhao'],resolve)

    },*/
    {
      path: '/Validation',
      name: 'Validation',
      component: resolve=>require(['@/public/Validation'],resolve),
      meta:{
        requireAuth:true,
        title: '身份验证'
      }
    },
  /*  {
      path: '/qqCallback',
      name: 'qqCallback',
      component: resolve=>require(['@/qq/qqCallback'],resolve)
    },*/
   /* {
      path: '/videoUpload',
      name: 'videoUpload',
      component: resolve=>require(['@/public/videoUpload'],resolve)

    },*/
    {
      path: '/mobileLogin',
      name: 'mobileLogin',
      component: resolve=>require(['@/components/mobile/mobileLogin'],resolve)

    },
    {
      path: '/volunteer',
      name: 'volunteer',
      component: resolve=>require(['@/components/mobile/volunteer'],resolve)
    },
    {
      path: '/palyer',
      name: 'palyer',
      component: resolve=>require(['@/components/mobile/palyer'],resolve)
    },
    {
      path: '/mobilestory',
      name: 'story',
      component: resolve=>require(['@/components/mobile/story'],resolve)
    },
    {
      path: '/mobileExpericer',
      name: 'expericer',
      component: resolve=>require(['@/components/mobile/expericer'],resolve)
    },
    {
      path: '/mobileHotsearch',
      name: 'hotsearch',
      component: resolve=>require(['@/components/mobile/hotsearch'],resolve)
    },
    {
      path: '/mobileReccently',
      name: 'reccently',
      component: resolve=>require(['@/components/mobile/reccently'],resolve)

    },
    {
      path: '/mStorypage',
      name: 'mStorypage',
      component: resolve=>require(['@/components/mobile/mStorypage'],resolve)
    },
    {
      path: '/mPublishPage',
      name: 'mPublishPage',
      component: resolve=>require(['@/components/mobile/mPublishPage'],resolve)

    },
    {
      path: '/mloading',
      name: 'mloading',
      component: resolve=>require(['@/public/mobilePublic/mloading'],resolve)
    },
    {
      path: '/meditOwer',
      name: 'editOwer',
      component: resolve=>require(['@/components/mobile/editOwer'],resolve)
    },
    {
      path: '/myMessage',
      name: 'myMessage',
      component: resolve=>require(['@/components/mobile/myMessage'],resolve)
    },
    {
      path: '/mOrder',
      name: 'mOrder',
      component: resolve=>require(['@/components/mobile/mOrder'],resolve)
    },
    {
      path: '/mPublishStory',
      name: 'mPublishStory',
      component: resolve=>require(['@/components/mobile/mPublishStory'],resolve)
    },
    {
      path: '/msyMessage',
      name: 'msyMessage',
      component: resolve=>require(['@/components/mobile/msyMessage'],resolve)
    },
    {
      path: '/mSetting',
      name: 'mSetting',
      component: resolve=>require(['@/components/mobile/mSetting'],resolve)
    },
    {
      path: '/mSearch',
      name: 'mSearch',
      component: resolve=>require(['@/components/mobile/mSearch'],resolve)
    },
    {
      path: '/msysCon',
      name: 'msysCon',
      component: resolve=>require(['@/components/mobile/msysCon'],resolve)
    },
    {
      path: '/share',
      name: 'share',
      component: resolve=>require(['@/public/share'],resolve),
      meta:{
        isLoginA:true,
        title: '分享'
      }
    }]
})
