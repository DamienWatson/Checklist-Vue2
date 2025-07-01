// Supplied Data
const values = {
  '01bbb998-af3d-47a4-b0ff-e67d033d80e9': 'Luz Ballard',
  '01021494-f157-4183-964c-6b0ddc964ab8': 'Corey Johnson',
  '97a2daa4-406b-4b1c-831e-bdfd90b224f2': 'Andrew Torres',
  '6256ba85-b59f-40b9-8715-406cc54d7f05': 'Nichole Wilson',
  '5c0c746c-ec56-4fb7-8b32-066b64d70611': 'Nancy Hall',
  'c103b480-8efb-450f-9141-6a8037de2348': 'Agnes Lorenzen',
  '4e0cc3dc-fce9-45d9-85c7-a3ae5cb0ce57': 'Donald Hyde',
  'f80af139-5c68-4475-8cb6-ced7e38c6f43': 'Dennis Fuller',
  '5073359e-b228-4852-b1a3-3f2edfc8672f': 'Francis Hodgkins',
  '9c9a3cc8-044e-43d0-87ff-58a6b44eca53': 'David McLain'
}

const structureValues = function() {
  const newList = [];
  Object.keys(values).forEach(key => {
    newList.push({
      'uuid': key,
      'name': values[key],
      'isChecked': false
    });
  });
  return newList;
}

//  
//     ##   ####   ##  ##  ######   ####   ##  ##  ##      ######   #####  ######     ##  ##     
//    ##   ##  ##  ##  ##  ##      ##  ##  ## ##   ##        ##    ##        ##      ##    ##    
//   ##    ##      ######  ######  ##      ####    ##        ##     ####     ##     ##      ##   
//    ##   ##  ##  ##  ##  ##      ##  ##  ## ##   ##        ##        ##    ##    ##      ##    
//     ##   ####   ##  ##  ######   ####   ##  ##  ######  ######  #####     ##   ##      ##     
//  
Vue.component('checklist-group', {
  props: {
    title: {
      type: String
    },
  },
  data: function() {
    return {
      checkList: structureValues(),
      lastCheck: null
    }
  },
  methods: {
    clickCheckbox: function(check) {
      check.isChecked = !check.isChecked;
      if (event.shiftKey && check.isChecked && this.lastCheck !== null) {
        let checkItems = false;
        this.checkList.forEach(item => {
          if (item == check || item == this.lastCheck) {
            checkItems = !checkItems;
          } else {
            if (checkItems) {
              item.isChecked = true;
            }
          }
        });
      }
      this.lastCheck = check;
      this.$emit("check-list-group", this.checkList);
    }
  },
  template: `
    <div class="user-block">
      <div class="separator"><div></div></div>
      <h2>{{ title }}</h2>
      <form class="check-group">
        <div
          v-for="check in checkList"
          v-bind:class="[check.isChecked ? 'checked' : '', 'check-item']"
          @click="clickCheckbox(check)"
        >
          <input
            v-bind:id="check.uuid"
            type="checkbox"
          >
          <label
            v-bind:for="check.uuid"
            @click="clickCheckbox(check)"
          >
            {{ check.name }}
          </label>
        </div>
      </form>
    </div>
  `
});
//  
//     ##   #####  ######  ##      ######   ####   ######  ######  #####      ##  ##     
//    ##   ##      ##      ##      ##      ##  ##    ##    ##      ##  ##    ##    ##    
//   ##     ####   ######  ##      ######  ##        ##    ######  ##  ##   ##      ##   
//    ##       ##  ##      ##      ##      ##  ##    ##    ##      ##  ##  ##      ##    
//     ##  #####   ######  ######  ######   ####     ##    ######  #####  ##      ##     
//
Vue.component('selected-block', {
  props: {
    title: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data: function() {
    return {
      checkList: []
    }
  },
  watch: {
    list: function() {
      this.checkList = this.list;
    }
  },
  computed: {
    selectedItems: function() {
      const selected = this.checkList.filter(check => (check.isChecked));
      return selected;
    }
  },
  template: `
    <div class="selected-block">
      <div class="separator separator-side"><div></div></div>
      <div class="selected-group">
        <h2>{{ title }}</h2>
        <ul class="selected-ids">
          <li v-for="item in selectedItems">{{ item.uuid }}</li>
        </ul>
      </div>
    </div>
  `
});

//  
//    ##   ####   #####   #####      ##  ##  
//   ##   ##  ##  ##  ##  ##  ##    ##    ## 
//  ##    ######  #####   #####    ##      ##
//   ##   ##  ##  ##      ##      ##      ## 
//    ##  ##  ##  ##      ##     ##      ##  
//
const app = new Vue({
  el: '#checkListApp',
  data: {
    title: 'Checklist Application',
    childData: []
  },
  methods: {
    updateList(check_list) {
      this.childData = check_list;
    }
  }
});
