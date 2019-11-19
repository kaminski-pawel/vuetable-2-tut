<template>
  <div class="ui container">
    <div class="vuetable-pagination ui basic segment grid">
      <filter-bar></filter-bar>
      <!-- <vuetable-pagination-info ref="paginationInfoTop"
      ></vuetable-pagination-info> -->
      <vuetable-pagination ref="paginationTop"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuetable ref="vuetable"
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="fields"
      pagination-path=""
      :per-page="10"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :sort-order="sortOrder"
      :append-params="moreParams"
      @vuetable:pagination-data="onPaginationData"
      detail-row-component="my-detail-row"
      @vuetable:cell-clicked="onCellClicked"
    ></vuetable>
    <!-- :css="css" -->
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueEvents from 'vue-events'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
// import VuetablePagination from 'vuetable-2/src/components/VuetablePaginationDropdown'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import accounting from 'accounting'
import moment from 'moment'
// import Sortable from 'sortablejs';

import CustomActions from './CustomActions'
import DetailRow from './DetailRow'
import FilterBar from './FilterBar'
import FieldDefs from './FieldDefs.js'

Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)
Vue.component('filter-bar', FilterBar)
Vue.use(VueEvents)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      sortOrder: [
        {
          field: 'salary',
          sortField: 'salary',
          direction: 'asc'
        }
      ],
      // css: {
      //   ascendingIcon: 'glyphicon glyphicon-chevron-up',
      //   descendingIcon: 'glyphicon glyphicon-chevron-down'
      // },
      fields: FieldDefs,
      moreParams: {}
    }
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
    },
    formatNumber (value) {
        return accounting.formatNumber(value, 2, ' ', ',')
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
      this.$refs.paginationTop.setPaginationData(paginationData)
      // this.$refs.paginationInfoTop.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      // by default, Vuetable uses id column to track the display state of each detail row
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onFilterSet (filterText) {
      this.moreParams = {
        'filter': filterText
      }
      Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    onFilterReset () {
      this.moreParams = {}
      Vue.nextTick( () => this.$refs.vuetable.refresh())
    }
  },
  mounted() {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
  },
}
</script>
