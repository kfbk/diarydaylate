<template>
  <v-container>
    <h2>郵便番号検索</h2>
    <v-row class="text-center">
      <v-col cols="3">
        <v-text-field 
          label="郵便番号"
          v-model="zipcode"
          placeholder="81000000"
          dense
          hint
        />
      </v-col>
      <v-col cols="4">
        <v-btn class="primary" @click="search">検索</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item-group v-for="(item, index) in searchResults" :key="index">
            <v-list-item>
              <v-list-item-content>
                {{item.address1}}
                {{item.address2}}
                {{item.address3}} 
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      zipcode: null,
      searchResults: [],
    }
  },
  methods: {
    async search() {
      let page = this   // こうしないとsearchResultsを見れない
      await this.$zipcode(this.zipcode).then(function(result) {
        let len = result.data.results.length
        for (let i=0; i<len; i++) {
          page.searchResults.push(result.data.results[i])
        }
      })
    }
  }
}
</script>
