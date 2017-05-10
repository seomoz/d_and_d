import {combineReducers} from 'redux';

import {
  UPDATE_ENGINE,

  UPDATE_EDIT_MODAL, UPDATE_EDITING_RULE,
  SAVE_EDIT_RULE, CLOSE_EDIT_MODAL,

  UPDATE_ADD_MODAL, UPDATE_ADDING_RULE,
  SAVE_ADD_RULE, CLOSE_ADD_MODAL} from '../actions'

export const ENGINES = {
  ALL: 'all',
  GOOGLE: 'google',
  YAHOO: 'yahoo',
  BING: 'bing'
}

const defaultRules = [
  {id: 1, engine: "google", locale_regex: "", strategy: "first_page", keyword_regex: "", max_tries: 0, proxy_bal: "google_ec2", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 2, engine: "google", locale_regex: "", strategy: "first_page", keyword_regex: "", max_tries: 0, proxy_bal: "google_ec2_intl", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 3, engine: "google", locale_regex: "ko-KR", strategy: "first_page", keyword_regex: "", max_tries: 100, proxy_bal: "google_ec2_au", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 4, engine: "yahoo", locale_regex: "ja-JP", strategy: "first_page", keyword_regex: "", max_tries: 0, proxy_bal: "yahoo_ec2", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 5, engine: "yahoo", locale_regex: "", strategy: "", keyword_regex: "", max_tries: 0, proxy_bal: "yahoo_ec2", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 6, engine: "bing", locale_regex: "zh-HK", strategy: "", keyword_regex: "", max_tries: 100, proxy_bal: "bing_api", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""},
  {id: 7, engine: "bing", locale_regex: "", strategy: "", keyword_regex: "", max_tries: 0, proxy_bal: "bing_ec2", dest_scraper: "Scrapeable.homepage_first_page_search", overwrite: "", raw_html: ""}
]

function main(state={
  engine: 'all',
  rules: defaultRules,
  editModalVisibility: false,
  editingRuleId: null,
  editingRule: {},
  addModalVisibility: false,
  updateEditingRule: {},
  updateAddingRule: {},

  }, action){

  switch(action.type) {
    // OUTSIDE of Modal
    case UPDATE_ENGINE:
      return Object.assign({}, state, {engine: action.engine})

// actions for RuleEditModal .....
// --------------------------------------------------------
// determine and execute opening of modal based on its id.
    // opens the modal.
    case UPDATE_EDIT_MODAL:
      const ruleId=action.ruleId
      const editingRule = state.rules.filter(({id} = {}) => id === ruleId)[0]

      return Object.assign({}, state, {
          editModalVisibility: action.editModalVisibility,
          editingRuleId: ruleId,
          editingRule
      })

    case UPDATE_EDITING_RULE:
      const {field, value} = action
      let changes = {}
      changes[field] = value

      const newRule = Object.assign({},
        state.editingRule,
        changes)
      return Object.assign({}, state, {
        editingRule: newRule
      })

      case CLOSE_EDIT_MODAL:
        return Object.assign({}, state, {
          editModalVisibility: action.editModalVisibility,
        })

      case SAVE_EDIT_RULE:
      // all rulevalues,
        console.log("rules", state.rules);
        const newRules =  [
          ...state.rules.slice(0, state.updateEditingRule.id - 1),
          state.editingRule,
          ...state.rules.slice(state.updateEditingRule.id)
        ];
        return Object.assign({},
          state, {
            editModalVisibility: false,
            rules: newRules}
        )
// -------------------------------------------------------
// this is all logic to do with AddingRule Modal
    case UPDATE_ADD_MODAL:
    // this is actually where the new Id making should go.
      var ruleId = action.ruleId
      var ruleIds = state.rules.map((rule) => rule.id)
      ruleIds.sort();
      var newRuleId = ruleIds[ruleIds.length - 1] + 1;
      console.log("newRuleId >>", newRuleId)

      return Object.assign({}, state, {
      addModalVisibility: true,
    })

//     case UPDATE_ADDING_MODAL:
//
//       const updateAddingRule = state.rules.filter(({id} = {}) => id === ruleId)[0]
//         return Object.assign({}, state, {
//           editModalVisibility: action.editModalVisibility,
//           addingRuleId: ruleId,
//           updateAddingRule
//         })
// //
    case UPDATE_ADDING_RULE:
      var {field, value} = action
      var changes = {}
      changes[field] = value

      var newRule = Object.assign({},
        state.addingRule,
        changes)
      return Object.assign({}, state, {
        addingRule: newRule
      })

    case CLOSE_ADD_MODAL:
      return Object.assign({}, state, {
        addModalVisibility: action.addModalVisibility,
      })

    case SAVE_ADD_RULE:
    // console.log("Save Add Rule  >>", rules, "<< rules")
    const newestRules = [
      ...state.rules.slice(0, state.updateAddingRule.id -1),
      state.updateAddingRule,
      ...state.rules.slice(state.updateAddingRule.id)
    ];
    return Object.assign({},
      state, {
        addModalVisibility: false,
        rules: newestRules}
      )



    default:
      return state
  }
}
const appState = combineReducers({
  main
})

export default appState
