<template>
    <td id="tensp">{{product.tensp}}</td>
    <td><img id="hinhsp" :src="'http://localhost:3000/'+ product.image"></td>
    <td>{{product.noibat}}</td>
    <td>{{product.moi}}</td>
    <td>{{product.giaban}}</td>
    <td>{{product.giakm}}</td>
    <td>{{product.dangban}}</td>
    <td>
      <div>
        <button type="submit" class="btn btn-secondary">Cập nhật</button>
        <button type="submit" class="btn btn-primary">Chi tiết</button>
        <button type="submit" class="btn btn-danger">Xóa</button>
      </div>
    </td>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product'],
}
</script>

<style scoped>
#hinhsp{
  height: 100px;
  width: 100px;
}
td{
  text-align: center;
}
#tensp{
  text-align: left;
}
</style>