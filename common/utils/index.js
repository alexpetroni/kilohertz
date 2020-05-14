import Vue from 'vue'
import moment from 'moment'

const EventBus = new Vue()

const FormState = {
  NEW: 'new',
  EDIT: 'edit',
}

const isNewForm = (val) => {
  return val == FormState.NEW
}

const isEditForm = (val) => {
  return val == FormState.EDIT
}

const jsonCopy = (val) => {
    return JSON.parse(JSON.stringify(val))
}

// filter an object properties based on predicate function
const filterObject = (obj, predicate) => {
  if(!obj.__proto__ || obj.__proto__.constructor.name !== 'Object'){
    throw new Error("The obj provided should be an Object")
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && predicate(obj[prop], prop, obj)){
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}

// get category tree with nested items in children array [ {name, id,..., children:[{name, id, children: [...]}]}]
const categoriesTreeAssamble = (categories, item = {}) => {
  item.children = categoryChildren(categories, item)

  if(item.children.length){
    item.children.map(e => {
      e.level = item.level ? item.level : 0
      categoriesTreeAssamble(categories, e)
    })
  }

  return item
}

// filter & sort category children
const categoryChildren = (categories, cat = {}) => {
  let catArr = categories.filter(e => e.parent == cat.id)
  catArr.sort((a, b) => a.order - b.order)
  return catArr
}

// delete object spceified field
// if 'deep' traverse it on array and object properties
const deleteObjField = (obj, field, deep = true) => {
  if(!field || !obj) return obj
  if(!(obj.__proto__ && obj.__proto__.constructor.name === 'Object') && !Array.isArray(obj)){ // if it is not an Obj or Array, return it
    return obj
  }

  if(Array.isArray(obj)){
    return obj.map(e => deleteObjField(e, field, deep))
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && field != prop){
      newObj[prop] = deep ? deleteObjField(obj[prop], field, deep) : obj[prop]
    }
  }

  return newObj
}

const deleteObjFields = (obj, fieldsArr, deep = true) => {
  if(!fieldsArr || !Array.isArray(fieldsArr) || !obj) return obj
  return fieldsArr.reduce((acc, e) => {
    acc = deleteObjField(acc, e, deep)
    return acc
  }, obj)
}

const parseDate = (date, dateFormat = "YYYY-MM-DD") => {
  return date && moment(date).isValid() ? moment(date).format(dateFormat) : null
}

const parseObjPropAsDate = (obj, fieldsArr, dateFormat) => {
  if(!fieldsArr || !Array.isArray(fieldsArr)){
    return obj
  }
  fieldsArr.map(e => {
    if(obj[e]){
      obj[e] = parseDate(obj[e], dateFormat)
    }
  })

  return obj
}

const safeParseFloat = (val) => {
  return Number.isNaN(val) ? null : +val
}

// for array containing primitive values
const sameArrayContent = function (a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length == b.length ? a.every((item, i) => { return item == b[i] }) : false
}

const isAnObject = (obj) => {
  return obj && obj.__proto__ && obj.__proto__.constructor && obj.__proto__.constructor.name === 'Object'
}

// return the single property of an object, null otherwise
const objectSingleProperty = (obj) => {
  if(!isAnObject(obj)) return
  let keys = Object.keys(obj)
  if(keys.length != 1) {
    console.log("Error: The Object provided should have a single property")
    return
  }
  return obj[keys[0]]
}

// merge deep o1 properties with the o2 ones if present
const mergeObjectsToLeft = (o1, o2) => {
  if(!o2 || !isAnObject(o2)) return o1
  if(!isAnObject(o1)) { throw new Error('First argument should be an object.')}
  return Object.keys(o1).reduce((acc, prop) => {
    if(o2[prop] === undefined) {
      acc[prop] = o1[prop]
    }else{
      acc[prop] = isAnObject(o1[prop]) ? mergeObjectsToLeft(o1[prop], o2[prop]) : o2[prop]
    }
    return acc
  }, {})
}

// take an events array and emit them from the specified component with the received value
const pipeEvents = function (comp, ...args) {
  let parent = comp
  let events = args.reduce((acc, e) => {
    acc[e] = parentEmitter(parent, e)
    return acc
  }, {})
  return events
}

const parentEmitter = function (comp, event) {
  return function (val) {
    // console.log('emit from parent val %s', val)
    comp.$emit(event, val)
  }
}


export {
  EventBus,
  FormState,
  isNewForm,
  isEditForm,
  jsonCopy,
  filterObject,
  categoriesTreeAssamble,
  deleteObjField,
  deleteObjFields,
  parseDate,
  parseObjPropAsDate,
  safeParseFloat,
  sameArrayContent,
  isAnObject,
  objectSingleProperty,
  mergeObjectsToLeft,
  pipeEvents,
}
