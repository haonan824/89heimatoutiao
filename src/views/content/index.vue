<template>
  <el-card class="boss">
    <bread-crumbs slot="header">
      <template slot="title">文章列表</template>
    </bread-crumbs>
    <el-row class="line" type="flex" align="middle">
      <span class="option">文章状态：</span>
      <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
      <el-radio-group @change="getarticle" v-model="formData.status">
        <el-radio :label="5">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="line" type="flex" align="middle">
      <span class="option">频道列表：</span>
      <el-select v-model="formData.channel_id" @change="getarticle" placeholder="请选择">
        <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-row>
    <el-row class="line" type="flex" align="middle">
      <span class="option">时间选择：</span>
      <el-date-picker
        @change="getarticle"
        v-model="formData.pubdate"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="——"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-row>
    <el-row>
      <div class="total">
        <span>共找到{{total_count}}条符合条件的内容</span>
      </div>
      <el-row
        class="circulation"
        type="flex"
        justify="space-between"
        align="middle"
        v-for="itme in list"
        :key="itme.id.toString()"
      >
        <el-col :span="18">
          <el-row type="flex" align="middle">
            <img
              style="height:100px;width:140px;border-radius:5px"
              :src="itme.cover.images.length ? itme.cover.images[0] : getimg"
              alt
            />
            <div style="margin-left:10px">
              <p>{{itme.title}}</p>
              <el-tag :type="itme.status|filterColor">{{itme.status | filterStatus}}</el-tag>
              <p style="font-size:12px;color:#666">{{itme.pubdate}}</p>
            </div>
          </el-row>
        </el-col>
        <el-col :span="3">
          <span class="handle">
            <i class="el-icon-edit"></i>修改
          </span>
          <span class="handle" @click="removearticle(itme.id.toString())">
            <i class="el-icon-delete"></i>删除
          </span>
        </el-col>
      </el-row>
    </el-row>
    <el-row style="height:60px" type='flex' justify="center" align="middle">
      <el-pagination background layout="prev, pager, next"
      :total="total_count"
      :page-size='formData.pageSize'
      :current-page='formData.currentPage'
        @current-change='getpages'
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      getimg: require('../../assets/img/mao.jpg'),
      formData: {
        status: 5, // 默认状态
        channel_id: null,
        pubdate: [],
        pageSize: 10,
        currentPage: 1
      },
      list: [],
      total_count: 0,
      channels: []
    }
  },
  methods: {
    removearticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getstate()
        })
      })
    },
    getpages (next) { // 分页
      this.formData.currentPage = next
      this.getstate()
    },
    getchannel () {
      // 获取频道
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getarticle () {
      // 获取
      this.formData.currentPage = 1
      this.getstate()
    },
    getstate () {
      // 数据传地
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.pubdate[0],
        end_pubdate: this.formData.pubdate[1],
        page: this.formData.currentPage,
        per_page: this.formData.pageSize
      }
      this.getdetails(params)
    },
    getdetails (params) {
      // 获取数据
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.total_count = res.data.total_count
        // console.log(res)
      })
    }
  },
  filters: {
    //   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterColor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'danger'
        case 2:
          return ''
        case 3:
          return 'info'
        default:
          break
      }
    }
  },
  created () {
    this.getdetails()
    this.getchannel()
  }
}
</script>

<style lang="less" scoped>
.boss {
  .line {
    height: 50px;
    .option {
      margin: 0 20px;
    }
  }
  .total {
    margin: 40px 0;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px dashed #ccc;
  }
  .circulation {
    height: 120px;
    border-bottom: 1px solid #ccc;
  }
  .handle {
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
  }
}
</style>
