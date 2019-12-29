<template>
  <el-card v-loading='loader' element-loading-background="rgba(0, 0, 0, 0.8)">
    <div slot="header" class="clearfix">
      <bread-crumbs>
        <template slot="title">评论列表</template>
      </bread-crumbs>
    </div>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="formAtter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作" width="200">
        <div slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="condition(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-row style="height:60px" type='flex' justify='center' align='middle'>
      <el-pagination background
      :total='page.total'
      :page-sizes='page.pageSizes'
      :current-page='page.currentpage'
      @current-change='getpage'
      layout="prev, pager, next"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { getstate, getstatus } from '../../acticles/articles'
export default {
  data () {
    return {
      loader: 'false', // 默认加载状态
      list: [],
      page: {
        total: 0, // 总条数
        pagesizes: 10, // 每页显示条数
        currentpage: 1 // 当前页码
      }
    }
  },
  methods: {
    formAtter: function (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '打开' : '关闭'
    },
    getpage (next) {
      // console.log(next)
      this.page.currentpage = next
      this.getdata()
    },
    async getdata () {
      this.loader = true // 打开加载状态 //获取评论内容 分页
      let res = await getstate(this.page.pagesizes, this.page.currentpage)
      this.list = res.data.results
      this.page.total = res.data.total_count
      // console.log(res)
      this.loader = false
    },
    async condition (row) { // 打开状态
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`你确定要${mess}吗`)
      await getstatus(row.id.toString(), row.comment_status)
      this.getdata()
      this.$message({
        type: 'success',
        message: '更改成功!'
      })
    }
  },
  created () {
    this.getdata()
  }
}
</script>

<style>
</style>
