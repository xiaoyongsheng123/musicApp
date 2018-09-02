<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>
<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {ERR_OK} from 'api/config'
	import {getSongList} from 'api/recommend'
	import {createSong} from 'common/js/song'
	import {getMusic} from 'api/singer'

	export default {
		computed: {
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getSongList()
		},
		methods: {
			_getSongList() {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
					return
				}
				getSongList(this.disc.dissid).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.cdlist[0].songlist)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albummid) {
						getMusic(musicData.songmid).then(res => {
							if (res.code === ERR_OK) {
								// console.log(res)
								const svkey = res.data.items
								const songVkey = svkey[0].vkey
								ret.push(createSong(musicData, songVkey))
							}
						})
					}
				})
				// console.log(ret)
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>