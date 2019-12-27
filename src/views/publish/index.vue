<template>
  <el-card v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div slot="header" class="clearfix">
      <bread-crumbs>
        <template slot="title">发布文章</template>
      </bread-crumbs>
    </div>
    <el-form ref='checkout' :model="formData" :rules="regulation"  label-width="80px">
      <el-form-item prop='title' label="标题：" style="width:500px">
        <el-input v-model="formData.title" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item style="height:400px"  prop='content' label="内容：" >
        <quill-editor style="height:300px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group @change="putImg" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <img-frame @putimg='gain' :list='formData.cover.images'></img-frame>
      </el-form-item>
      <el-form-item prop='channel_id' label="频道：">
         <el-select placeholder="请选择" v-model="formData.channel_id" >
        <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="putdata()">发布</el-button>
        <el-button @click="putdata(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 图片数量
          images: [] // 图片地址
        },
        channel_id: null
      },
      regulation: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度需要在5到30字符之间' }],
        content: [{ required: true, message: '标题不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    gain (img, index) {
      this.formData.cover.images = this.formData.cover.images.map((itme, i) => i === index ? img : itme)
    },
    putImg () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    getassign (articleId) { // 获取指定ID文章
      // console.log(articleId)
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    },
    getchannel () {
      this.loading = true
      // 获取频道
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
        this.loading = false
      })
    },
    putdata (judge) { // 新建/修改
      // console.log(judge)
      this.$refs.checkout.validate((isOk) => {
        let { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post',
          data: this.formData,
          params: { draft: judge }
        }).then(res => {
          // console.log(res)
          this.$router.push('/home/articles')
          this.loading = false
        })
      })
    }
  },
  watch: {
    // 解决两个路由共用一个组件的问题
    $route: function (to) {
      console.log(to)
      if (Object.keys(to.params).length) {
        this.getassign(to.params.articleId)
      } else {
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, // 图片数量
            images: [] // 图片地址
          },
          channel_id: null
        }
      }
    },
    'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    }
  },
  created () {
    this.getchannel()
    let { articleId } = this.$route.params
    articleId && this.getassign(articleId)
  }
}
</script>

<style>
</style>
