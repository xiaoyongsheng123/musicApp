# vue-music

> 这是一个基于vue2.x全家桶和真实线上数据接口开发的一个媲美原生的移动端音乐App，页面包括有歌单推荐页，歌手列表页，歌手详情页，播放器页面，排行榜页面和搜索页面。

## 实现功能

- 轮播图无缝滚动效果
- 歌手与索引的左右联动效果
- 点击歌单、歌手以及排行榜会通过子路由切换到相应的详情页面
- 播放器以及迷你播放器组件切换的过渡动画
- 歌曲的播放、进度条操作、切换歌曲、切换播放模式、歌词联动功能
- 歌曲搜索，热门搜索展示，搜索历史的保存以及弹窗操作的功能

## 项目截图

<div align=center>
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/1.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/2.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/3.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/4.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/5.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/6.gif" width="30%">
</div>

## 主要技术栈

- `Vue.js`(版本2.x)：`MVVM`框架
- `Vuex`：状态管理模式，采用集中式储存管理应用的所有组件的状态。
- `Vue Router`：`vue`构建单页面应用的前端路由
- `axios`、`jsonp`：服务端通讯，分别通过代理后端和跨域访问的方式抓取线上数据接口
- `better-scroll`：轻量且流畅的移动端滚动库
- `webpack 2.0`：构建工具
- `es6`：源码

## 组件关系图

## 要点总结

### Vue

- `<router-link>`：通过`to`属性指定目标地址；配置`tag`属性生成别的标签，当目标路由成功激活时，将自动在`tag`生成的标签上自动设置`router-link-active`类名

- `<keep-alive>`：在组件切换过程中将状态保留在内存中，防止重复渲染DOM

- `<slot>`：Vue的内容分发机制，即可以将父组件的内容分发到子组件的指定位置中，`<slot>`则作为承载分发内容的出口

- ``
### JS
- `Promise`：异步编程的一种解决方案，在项目中的运用：

```
export default function jsonp(url, data, option) {
	url += (url.indexOf('?') < 0 '?' : '&') + param(data)
	return new Promise((resolve, reject) => {
		originJSONP(url, option, (err, data) => {
			if (!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}
```

- `Object.assign()`：用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。第一个参数是目标对象，后面的参数都是源对象

```
const data = Object.assign({}, commonParams, {
	platform: 'h5',
	uin: 0,
	needNewCode: 1
})
```
- `setTimeout(fn, 20)`：JS线程执行完毕后一个Tick的时间约17ms内DOM就有可以渲染完毕，所以`setTimeout(fn, 20)`是非常稳妥的写法

### CSS

- `Stylus`：编写模块化的CSS
- `Flex`：弹性布局，实现常见的移动设备的响应式布局

### 库的使用

- `better-scroll`：
   - ***易错***：`better-scroll`只会处理容器的第一个子元素的滚动；且子元素的宽度(或高度)一定要大于容器的宽度(或高度)才可以滚动；当一个页面出现不同滚动需求时(例如歌单推荐页即有横向又有纵向的滚动)，可进行嵌套使用，但必须用一个容器将两部分滚动包裹在一起
   - ***slider组件***：需配置参数值`snap:true`，另外设置`snapLoop：true`表示无缝循环轮播，`snapThreshold:0.3`表示手指滑动大于这个阈值则滑动到下一页，`snapSpeed:400`表示轮播图切换的动画时间
   - ***事件***：
      - `scrollEnd`表示滚动结束时触发
   - ***函数***：
      - `refresh()`：强制scroll重新计算，当better-scroll中的元素发生变化的时候调用此方法
      - `getCurrentPage()`：获取滚动的当前页，返回对象结构为{x, y, pageX, pageY}，x,y代表滚动横向和纵向的位置；pageX,pageY表示横向和纵向的页面索引。用法如:getCurrentPage().pageX
      - `goToPage(x, y, time, easing)`：滚动到对应的页面，x表示横向页面索引，y表示纵向页面索引，time表示动画，easing表示缓动函数(可省略)
- `jsonp`：获取轮播图数据时用到，传入的url需做字符串处理，data需进行`encodeURIComponent()`编码处理，再结合`new Promise()`异步获取数据

- `axios`：基于promise的HTTP库，可以用在浏览器和node.js中，项目中用的最多的通过代理后端服务器获取数据的手段
```
// 歌单数据获取
before(app) {
	app.get('/api/getDiscList', function(req, res) {
		var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
		axios.get(url, {
			header: {
				referer: 'http://y.qq.com',
				host: 'c.y.qq.com'
			},
			params: req.query
		}).then((response) => {
			res.json(response.data)
		}).catch((e) => {
			console.log(e)
		})
	})
}

export function getDiscList() {
	const url = '/api/getDiscList'

	const data = Object.assign()

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
```

- `vue-lazyload`：懒加载图片，优化用户体验

### 轮播图

- ***设置轮播宽度***：`Bscroll`设置`snapLoop`时会自动克隆两个轮播图插在前后位置，为了保证轮播图无缝切换，需要增加两个宽度；同时加入窗口变化时不再增加宽度的限制
```
if (this.loop && !isResize) {
	width += 2*sliderWidth
}
```

- ***初始化dots***：dots的数量由轮播图数量决定，因此需在设置克隆插入轮播之前进行

- ***初始化滚动***：通过`getCurrentPage()`获取当前滑动页的索引赋值给`currentPageIndex`，与dots的index比较是否相等，以此添加active

- ***自动播放***：自定义定时器结合`goToPage()`跳转到相应的页面
```
_play() {
	let pageIndex = this.currentPageIndex + 1
	if (this.loop) {
		pageIndex += 1
	}
	this.timer = setTimeout( ()=> {
		this.slider.goToPage(pageIndex, 0, 400)
	}, this.interval)
}
```
- ***清除定时器***：每次手指滑动时都应清除定时器，避免索引值的获取发生错乱；组件销毁时都应清除定时器达到释放内存的目的

- ***监听窗口变化***：为了保证窗口变化时依旧能够正常轮播，应监听`resize`事件来重新渲染轮播图并计算宽度

```
window.addEventListener('resize', ()=> {
	if (!this.slider) {
		return
	}
	this._setSliderWidth(true)
	this.slider.refresh()
})
```

### 歌手列表数据聚合

```
// 定义Singer类(相当于ES5的构造函数)创建属性，处理avatar字段
export default class Singer {
	constructor({id, name}) {
		this.id = id
		this.name = name
		this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
	}
}

_normalizeSinger(list) {
	let map = {
		hot: {
			title: HOT_NAME,
			items: []
		}
	}
	// 获取需要用到的数据字段
	// 将前10条数据push到hot对象的items中
	list.forEach((item, index) => {
		if (index < HOT_SINGER_LEN) {
			map.hot.items.push(new Singer({
				id: item.Fsinger_mid,
				name: item.Fsinger_name
			}))
		}
		const key = item.Findex
		// 创建以字母为键值的对象
		if (!map[key]) {
			map[key] = {
				title: key,
				items: []
			}
		}
		// 如果存在该字母名的对象，则将数据push到该对象的items中
		map[key].items.push(new Singer({
			id: item.Fsinger_mid,
			name: item.Fsinger_name
		}))
	})
	// 为了得到有序列表，需要处理map
	let hot = []
	let ret = []
	for (let key in map) {
		let val = map[key]
		if (val.title.match(/[a-zA-Z]/)) {
			ret.push(val)
		} else if (val.title === HOT_NAME) {
			hot.push(val)
		}
	}
	// 排序
	ret.sort((a, b) = {
		return a.title.charCodeAt(0) -b.title.charCodeAt(0)
	})
	// 最后拼接数组
	return hot.concat(ret)
}
```

### 左右列表的联动

- 左滑右动:通过监听滚动组件派发过来的scrollY的值
```
scrollY(newY) {
	// this.listHeight为左侧各部分列表的clientHeight值组成的数组
	const listHieght = this.listHeight

	// 当滚动到顶部时，newY>0
	if (newY > 0) {
		this.currentIndex = 0
		return 
	}

	// 在中间部分滚动
	// 高度数组比列表数组多一个元素(height=0),因此要减去1
	for(let i = 0; i < listHeight.length - 1; i++) {
		let height1 = listHeight[i]
		let height2 = listHeight[i + 1]
		if (-newY >= height1 && -newY < height2) {
			this.currentIndex = i
			this.diff = height2 + newY
			return
		}
	}

	// 当滚动到底部时，且-newY大于最后一个元素的上限
	this.currentIndex = listHeight.length - 2
}
```
- 右滑左动：此处的核心为Vue的手指触摸事件和动态绑定属性值
```
onShortcutTouchStart(e) {
	// 获取动态绑定的属性值,getData为自定义的获取属性值的函数
	let anchorIndex = getData(e.target, 'index')
	// 记录触摸屏幕的第一个手指以及pageY值
	let firstTouch = e.touches[0]
	this.touch.y1 = firstTouch.pageY
	// 记录触摸当前li的index
	this.touch.anchorIndex = anchorIndex
	this._scrollTo(anchorIndex)
}

onShortcutTouchMove(e) {
	// 记录滑动后的手指以及pageY的值
	let firstTouch = e.touches[0]
	this.touch.y2 = firstTouch.pageY
	// 滑动了多少个li = 滑动的距离/li的高度
	let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
	// 计算滑动结束时当前li的index
	let anchorIndex = parseInt(this.touch.anchorIndex) + delta
	this._scorllTo(anchorIndex)
}

_scrollTo(index) {
	
	// 滚动边界值处理
	if (!index && index !== 0) {
		return
	}
	if (index < 0) {
		index = 0
	} else if (index > this.listHieght.length - 2) {
		index = this.listHeight.length -2
	}
	this.scrollY = -this.listHeight[index]
	// 左侧滑动到对应位置
	this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
}
```
- 固定标题栏：计算列表clientHeight与滚动的scollY值的和(newVal)，判断这个值是否大于0且小于固定栏的高度值，是的话则让固定栏发生(newVal-TITLE_HEIGHT)的translate变化

```
// 在scrollY中计算diff的变化
this.diff = height2 + newY

diff(newVal) {
	let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
	// diff是动态变化的，所以这里要提前计算fixedTop的值，减少transform的DOM操作，达到性能优化效果
	if (this.fixedTop == fixedTop) {
		return
	}
	this.fixedTop = fixedTop
	this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
}
```

### 歌曲数据的获取和处理

- vuex管理歌手数据 —— 通过歌手id获取相应的歌手歌曲数据 —— 遍历数据通过结构赋值获取每首歌曲的数据musicData —— 再处理该数据取得需要用到的字段

// 通过vuex的mapGetters方法从store中获取歌手数据
```
computed: {
	..mapGetters([
		'singer'
	])
}
methods: {
	_getDetail() {
		// 边界处理，刷新回退操作
		if (!this.singer.id) {
			this.$router.push('/singer')
			return
		}
		getSingerDetail(this.singer.id).then((res) => {
			if (res.code === ERR_OK) {
				this.songs = this._normalizeSongs(res.data.list)
			}
		})
	},
	// 数据标准化
	_normalizeSongs(list) {
		let ret = []
		list.forEach((item) => {
			// 对象的结构赋值，取得数据中的musicData对象
			let {musicData} = item
			if (musicData.songid && musicDta.albummid) {
				// 通过歌曲id获取歌曲数据
				getMusic(musicData.songmid).then(res => {
					if (res.code === ERR_OK) {
						// 获取歌曲音频链接需要用到的songVkey字段
						const svkey = res.data.items
						const songVkey = svkey[0].vkey
						// 保留需要用到的一些字段
						const newSong = createSong(musicData, songVkey)
						ret.push(newSong)
					}
				})
			}
		})
		return ret
	}
}
// song.js
export function createSong(musicData, songVkey) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=2908953575&uin=0&fromtag=66`
	})
}

// 这里作歌手名称的处理
function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}
```

### 播放器状态管理(vuex的使用)
```
|—— components
|—— App.vue
|—— main.js
|—— store
	|—— index.js 			// 将各个模块组装并导出store
	|—— state.js 			// 初始化状态
	|—— mutation-types.js 	// 将所有状态别名放在这里
	|—— mutations.js 		// 定义监听状态的函数
	|—— actions.js 			// 异步提交状态
	|—— getters.js 			// 获取状态并映射到组件上
```
- `index.js`
```
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'prodycution'

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
```
- `state.js`

```
import {playMode} from 'common/js/config'

const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	playlist: [],
	sequenceList: [],
	mode: playMode.sequence,
	currentIndex: -1
}

export default state
```
- mutation-types.js

```
export const SET_SINGER = 'SET_SINGER'

export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'

...
```

- mutations.js

```
import * as types from './mutation-types'

const mutations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING_STATE](state, flag) {
		state.playing = flag
	}
	...
}
```

- actions.js

```
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	if (state.mode === playMode.random) {
		// 打乱歌曲列表顺序
		let randomList = shuffle(list)
		commit(types.SET_PLAYLIST, randomList)
		// 找到顺序播放时的当前歌曲id与随机播放列表id相等时歌曲的
		index值并代替它
		index = findIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit}, {list}) {
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}
```

- getters.js

```
export const singer = state => state.singer

export const playing = state => state.playing
...
export const currentSong = (state) = > {
	return state.playlist[state.currenIndex] || {}
}

```

- 点击某一歌曲后`song-list`组件将派发事件和数据给父组件，父组件再根据派发过来的事件定义`selectItem`函数，此时可以通过vuex的辅助函数mapActions提交状态，并且在`selectItem`函数中将歌曲的数据传入actions的状态函数（该函数可以异步批量提交状态）中，这些状态可以在组件中通过vuex的辅助函数mapGetter来获得(由于状态是动态的，所以函数需定义在computed属性中)。
- 在mutations中同样可以提交状态，在组件中可通过vuex辅助函数mapMutations来分别改变状态并映射到vuex中提交，注意这样做不是异步操作

```
selectItem(item, index) {
	this.selectPlay({
		list: this.songs,
		index
	})
}

...mapActions([
	'selectPlay',
	'randomPlay'
])
```

```
computed: {
	// 获取变化的状态
	...mapGetters([
		'fullScreen',
		'playlist',
		...
	])
}
methods: {
	...mapMutations({
		setFullScreen: 'SET_FULL_SCREEN',
		setPlayingState: 'SET_PLAYING_STATE',
		...
	})
	// 此时就可以在需要的时候以`this.setFullScreen(false)`的方式来改变状态
}
```

### 唱片飞出飞入动画

- 计算位移变化和缩放值(此处应注意位移的变化是取中心点到中心点的x,y距离变化。)

```
_getPosAndScale() {
	// 缩小版唱片的宽度
	const targetWidth = 40
	// 缩小版唱片中心到左边距离
	const paddingLeft = 40
	// 缩小版唱片中心到底部的距离
	const paddingBottom = 30
	// 放大版唱片中心到顶部的距离
	const paddingTop = 80
	const width = window.innerWidth * 0.8
	const scale = targetWidth / width
	cosnt x = -(window.innerWidth / 2 - paddingLeft)
	// 注意translate3d变化的坐标系：纵轴y向下为正值
	const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
	return {
		x,
		y,
		scale
	}
}
```

- 结合vue的动画钩子函数和`create-keyframe-animation`动画库定义不同时机的动画行为(在`enter`和`leave`中必须使用`done`进行回调，否则它们会被同步调用，过渡会立即完成)

### 歌曲播放操作

- 快速切换歌曲引发的错误：该错误是由于快速切换时歌曲播放地址没有及时获取而引发的，此处可以利用H5的api`canplay`来解决，在`audio`监听`canplay`事件表示歌曲已经可以播放

- 时间戳格式处理

```
format(interval) {
	interval = interval | 0
	const minute = interval / 60
	const second = this._pad(interval % 60)
	return `${minute}:${second}`
}

_pad(num, n = 2) {
	let len = num.toString().length
	while (len < n) {
		// 当传入的数字字符小于2时，在前面补0
		num = '0' + num
		len++
	}
	return num
}
```

- 圆形进度条：利用SVG实现，由两个圆组成，一个是背景圆，一个是已播放的圆形进度

```
<div class="progress-circle">
	<svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
		<circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
		<circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
	</svg>
	<slot></slot>
</div>
```

- 切换播放模式：默认为顺序播放，用的是原歌曲列表；随机播放的原理是定义了一个洗牌函数将原歌曲列表打乱来实现

```
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
	// 不改变原数组
	let _arr = arr.slice()
	for (var i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}
```
bug: 切换模式时歌曲发生改变，原因是由于currentSong是由playlist和currentIndex计算而来，切换模式后列表发生变化，当前播放歌曲也会随之发生变化

```
resetCurrentIndex(list) {
	// 获取当前播放歌曲在列表中的索引并重新设置
	let index = list.findIndex((item) => {
		return item.id === this.currenSong.id
	})
	this.setCurrentIndex(index)
}

watch: {
	currentSong(newSong, oldSong) {
		if (newSong.id === oldSong.id) {
			return
		}
	}
}
```

### 歌词相关

- 歌词数据解析：第三方库js-base64(解码base64字符串)和lyric-parser(解析歌词，处理播放状态)
```
app.get('/api/lyric', function(req, res) {
	...
	axios.get(url, ...).then((response) => {
		var ret = response.data
		// 获取到的是jsonp字符串，需做正则处理
		if (typeof ret === 'string') {
			var reg = /^\w+\(({[^()]})\)$/
			var matches = ret.match(reg)
			if (matches) {
				ret = JSON.parse(matches[1])
			}
		}
		res.json(ret)
	})
})

getLyric() {
	this.currentSong.getLyric().then((lyric) => {
		this.currentLyric = new Lyric(lyric, this.handleLyric)
		if (this.playing) {
			// 调用lyric-parser的api播放歌词
			this.currentLyric.play()
		}
	}).catch(() => {
		this.currentLyric = null
		this.playingLyric = ''
		this.currentLineNum = 0
	})
},
// 让歌词的滚动保持居中状态
headleLyric({lineNum, txt}) {
	this.currentLineNum = lineNum
	if (lineNum > 5) {
		let lineEl = this.$refs.lyricLine[lineNum - 5]
		this.$refs.lyriclist.scrollToElement(lineEl, 1000)
	} else {
		this.$refs.lyricList.scrollTo(0, 0, 1000)
	}
	// 展示当前播放的歌词
	this.playingLyric = txt
}
```
- 唱片和歌词滑动切换

```
// 手指滑动y的值大于x的值，则判断为歌词的滚动
if (Math.abs(deltaY) > Math.abs(deltaX)) {
	return
}

// 需定义一个开关来判断当前是否是滑动状态
middleTouchStart(e) {
	this.touch.moved = false
}
middleTouchMove(e) {
	if (!this.touch.moved) {
		this.touch.moved = true
	}
}
middleTouchEnd(e) {
	// 判断为非滑动状态，不执行后面的操作
	if (!this.touch.moved) {
		return
	}
}

// lyric-parser播放歌词的原理是定义了一个定时器，当歌曲变化时，需调用它的stop()方法清除掉定时器，防止出现歌词播放的闪动的Bug
watch: {
	currentSong {
		...
		if (this.currentLyric) {
			this.currentLyric.stop()
		}
		// 解决微信从后台切换到前台无法正常播放的问题
		setTimeout(() => {
			this.$refs.audio.play()
			this.getLyric()
		}, 1000)
	}
}

```

### 迷你播放器自适应

- 混入(mixins): 分发Vue组件中可复用功能的方式
```
// mixin.js
import {mapGetters} from 'vuex'

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mouted() {
		this.handlePlaylist(this.playlist)
	},
	activated() {
		this.handlePlaylist(this.playlist)
	}
	watch: {
		playlist(newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		// 在组件中定义覆盖该函数，不然则报错
		handlePlaylist() {
			throw new Error('...')
		}
	}
}

// music-list.vue
import {playlistMixin} from 'common/js/mixin'
methods: {
	handlePlaylist(playlist) {
		const bottom = playlist.length > 0 ? '60px' : ''
		this.$refs.list.$el.style.bottom = bottom
		this.$refs.list.refresh()
	}
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

