!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t){const a=new Map([["africa",["east-africa","egypt","congo","madagascar","south-africa","north-africa"]],["asia",["afghanistan","india","irkutsk","kamchatka","middle-east","mongolia","siam","china","japan","siberia","ural","yakutsk"]],["oceania",["eastern-australia","new-guinea","western-australia","indonesia"]],["europe",["great-britain","iceland","northern-europe","scandinavia","southern-europe","ukraine","western-europe"]],["north-america",["alaska","alberta","central-america","eastern-united-states","greenland","northwest-territory","ontario","western-united-states","quebec"]],["south-america",["argentina","brazil","peru","venezuela"]]]),n=new Map([["asia",7],["africa",3],["europe",5],["oceania",2],["north-america",5],["south-america",2]]),r=new Map([["east-africa",[574.401,450]],["egypt",[517.5,361.5]],["congo",[506.535,483.5]],["madagascar",[589.75,563.5]],["south-africa",[516.014,566.5]],["north-africa",[450.803,389.5]],["afghanistan",[660.305,253.145]],["india",[710.5,373.739]],["irkutsk",[819.499,188.86]],["kamchatka",[933,161]],["middle-east",[595,348.5]],["mongolia",[837.375,241]],["siam",[781.5,380]],["china",[769,300]],["japan",[908,242.5]],["siberia",[749,152.618]],["ural",[685.77,172.108]],["yakutsk",[855.5,119.5]],["eastern-australia",[908,557]],["new-guinea",[921.5,466.343]],["western-australia",[805.5,552.5]],["indonesia",[820.5,445.5]],["great-britain",[434.856,204.549]],["iceland",[433,147.672]],["northern-europe",[489,218.447]],["scandinavia",[499.5,138.5]],["southern-europe",[503.073,275]],["ukraine",[585,193.5]],["western-europe",[442,269.5]],["alaska",[68,137.451]],["alberta",[161.5,178]],["central-america",[186,319]],["eastern-united-states",[255,255]],["greenland",[358.5,95.9053]],["northwest-territory",[177.033,113.5]],["ontario",[250.5,196.056]],["western-united-states",[180.126,246]],["quebec",[321.5,189.5]],["argentina",[246,565.319]],["brazil",[321.267,455.5]],["peru",[208.951,464]],["venezuela",[233,373.5]]]),o=new Map([["great-britain",["iceland","scandinavia","northern-europe","western-europe"]],["iceland",["greenland","scandinavia","great-britain"]],["northern-europe",["southern-europe","western-europe","scandinavia","ukraine","great-britain"]],["southern-europe",["western-europe","northern-europe","ukraine","middle-east","egypt","north-africa"]],["scandinavia",["iceland","ukraine","northern-europe","great-britain"]],["ukraine",["ural","afghanistan","middle-east","southern-europe","northern-europe","scandinavia"]],["western-europe",["great-britain","southern-europe","northern-europe","north-africa"]],["afghanistan",["ural","china","india","middle-east","ukraine"]],["india",["china","siam","middle-east","afghanistan"]],["irkutsk",["yakutsk","mongolia","kamchatka","siberia"]],["kamchatka",["alaska","yakutsk","irkutsk","mongolia","japan"]],["middle-east",["southern-europe","egypt","ukraine","afghanistan","india","east-africa"]],["mongolia",["china","japan","irkutsk","siberia","kamchatka"]],["siam",["india","china","indonesia"]],["china",["india","siam","mongolia","afghanistan","ural","siberia"]],["japan",["mongolia","kamchatka"]],["siberia",["ural","china","yakutsk","irkutsk","mongolia"]],["ural",["ukraine","afghanistan","china","siberia"]],["yakutsk",["irkutsk","siberia","kamchatka"]],["east-africa",["middle-east","egypt","madagascar","congo","north-africa","south-africa"]],["egypt",["north-africa","middle-east","east-africa","southern-europe"]],["congo",["east-africa","south-africa","north-africa"]],["madagascar",["east-africa","south-africa"]],["south-africa",["madagascar","east-africa","congo"]],["north-africa",["western-europe","southern-europe","east-africa","egypt","congo","brazil"]],["alaska",["kamchatka","northwest-territory","alberta"]],["alberta",["ontario","alaska","northwest-territory","western-united-states"]],["central-america",["western-united-states","eastern-united-states","venezuela"]],["eastern-united-states",["western-united-states","central-america","quebec","ontario"]],["greenland",["iceland","northwest-territory","ontario","quebec"]],["northwest-territory",["alaska","alberta","ontario","greenland"]],["ontario",["alberta","northwest-territory","quebec","western-united-states","eastern-united-states","greenland"]],["western-united-states",["eastern-united-states","ontario","alberta","central-america"]],["quebec",["ontario","greenland","eastern-united-states"]],["argentina",["brazil","peru"]],["brazil",["argentina","peru","north-africa","venezuela"]],["peru",["venezuela","argentina","brazil"]],["venezuela",["brazil","peru","central-america"]],["eastern-australia",["western-australia","new-guinea"]],["new-guinea",["eastern-australia","indonesia"]],["western-australia",["eastern-australia","new-guinea","indonesia"]],["indonesia",["siam","new-guinea","western-australia","eastern-australia"]]]);e.exports={NUM_PLAYERS:2,USER_TABLE:"user_table",MESSAGE_TABLE:"message_table",GAME_TABLE:"game_table",ERRORS:{full:"The game you are trying to join is full!"},PHASE:{DEPLOY:0,ATTACK:1,MOVE:2,CREATED:3,FINISHED:4},INITIAL_ARMIES:[0,0,40,35,30,25,20],COUNTRIES:["great-britain","iceland","northern-europe","southern-europe","scandinavia","ukraine","western-europe","afghanistan","india","irkutsk","kamchatka","middle-east","mongolia","siam","china","japan","siberia","ural","yakutsk","east-africa","egypt","congo","madagascar","south-africa","north-africa","alaska","alberta","central-america","eastern-united-states","greenland","northwest-territory","ontario","western-united-states","quebec","argentina","brazil","peru","venezuela","eastern-australia","new-guinea","western-australia","indonesia"],CONTINENTS:a,CONTINENT_BONUSES:n,ATTACK_RESULT:{WIN:0,DRAW:1,LOSE:2},COUNTRY_CONNECTIONS:o,COUNTRY_COORDINATES:r}},,function(e,t){const a={en:{phases:["Deploy troops","Attack!","Move Troops","Created","Finished"],players:["Red","Green"],turn:"Turn",from:"from",to:"to",minus:"-",plus:"+",player:"Player",phase:"Phase",country:"Country",countries:new Map([["great-britain","Gran Britain"],["iceland","Iceland"],["northern-europe","Northern Europe"],["southern-europe","Southern Europe"],["scandinavia","Scandinavia"],["ukraine","Ukraine"],["western-europe","Western Europe"],["afghanistan","Afganistan"],["india","India"],["irkutsk","Irkutsk"],["kamchatka","Kamchatka"],["middle-east","Middle East"],["mongolia","Mongolia"],["siam","Siam"],["china","China"],["japan","Japan"],["siberia","Siberia"],["ural","Ural"],["yakutsk","Yakutsk"],["east-africa","Eastern Africa"],["egypt","Egypt"],["congo","Congo"],["madagascar","Madagascar"],["south-africa","Southern África"],["north-africa","Northern África"],["alaska","Alaska"],["alberta","Alberta"],["central-america","Central America"],["eastern-united-states","Eastern US"],["greenland","Greenland"],["northwest-territory","Northwest"],["ontario","Ontario"],["western-united-states","Western US"],["quebec","Quebec"],["argentina","Argentina"],["brazil","Brasil"],["peru","Peru"],["venezuela","Venezuela"],["eastern-australia","Eastern Australia"],["new-guinea","New Guinea"],["western-australia","Western Australia"],["indonesia","Indonesia"]])}};e.exports={i18n:a}},,function(e,t,a){"use strict";a.r(t);var n=a(11),r=a(2),o=a(0);function i(e,t){const a=t.countries.get(e);return a.owner===t.player&&a.count>1}function s(e,t,a){return!!u(e,t)&&a.countries.get(t).owner===a.countries.get(e).owner}function c(e,t,a){return!!u(e,t)&&a.countries.get(t).owner!==a.countries.get(e).owner}function u(e,t){let a=o.COUNTRY_CONNECTIONS.get(e);return!!a&&a.includes(t)}function l(e){return e*(180/Math.PI)}let p=e=>({winner:e.winner,playerId:e.playerId,action:e.action,result:e.result,turn:e.turn,phase:e.phase,player:e.player,players:e.players,countries:[...e.countries]});var h=new Vuex.Store({state:{winner:null,playerId:null,country:null,action:{from:null,to:null,count:0},result:null,turn:0,phase:o.PHASE.CREATED,player:0,players:[],countries:[]},mutations:{updateState(e,t){console.log("UPDATED A GAME STATE",t.state),e.winner=t.state.winner,e.playerId=t.state.playerId,e.action=t.state.action,e.result=t.state.result,e.turn=t.state.turn,e.phase=t.state.phase,e.player=t.state.player,e.players=t.state.players,e.countries=t.state.countries},enterCountry(e,t){e.country=t.id,e.countries.get(e.country).selected=!0},leaveCountry(e,t){e.countries.get(e.country).selected=!1,e.country=t.id},deployTroop(e,t){e.players[e.player].actions.push({id:e.action.to})},gatherTroop(e){const t=e.players[e.player].actions.findIndex(t=>t.id===e.action.to);t<0&&console.error("Cannot retrieve troops");const[a]=e.players[e.player].actions.splice(t,1)},actionFrom(e,t){e.action.from=t.id},actionTo(e,t){e.action.to=t.id},actionIncrement(e){e.countries.get(e.action.from).count-e.action.count>1&&e.action.count++},actionDecrement(e){e.action.count>1&&e.action.count--}},actions:{updateState(e,t){e.commit("updateState",t)},enterCountry(e,t){e.commit("enterCountry",t)},leaveCountry(e,t){e.commit("leaveCountry",t)},deployTroop(e,t){e.commit("deployTroop",t)},gatherTroop(e,t){e.commit("gatherTroop",t)},moveFrom(e,t){e.commit("moveFrom",t)},moveTo(e,t){e.commit("moveTo",t)},actionFrom(e,t){e.commit("actionFrom",t)},actionTo(e,t){e.commit("actionTo",t)},actionIncrement(e){e.commit("actionIncrement")},actionDecrement(e){e.commit("actionDecrement")}}});const d=io(),m=function(){let e=window.location.pathname.split("/");return e[e.length-1]}();new Vue({el:"#app",store:h,mounted:async function(){let e=await this.getState();const{$store:{dispatch:t}}=this;t("updateState",{state:e}),d.on(Object(n.gameEvent)(m),async e=>{const{$store:{dispatch:t}}=this;t("updateState",{state:await this.getState()})})},methods:{async getState(){let e=await axios.get(`/game/${m}/update`);return{winner:(t=e.data.state).winner,playerId:t.playerId,action:t.action,result:t.result,turn:t.turn,phase:t.phase,player:t.player,players:t.players,countries:new Map(t.countries)};var t},postState:async e=>(console.log("SENDING A GAME STATE",e),(await axios.post(`/game/${m}/update`,{state:p(e)})).data),getDiceClasses(e,t){const{$store:{state:a}}=this;if(this.$store.state.result){if("attack"===e)return["attack-dice","dice-value-"+a.result[e][t]];if("defense"===e)return["defense-dice","dice-value-"+a.result[e][t]]}return"hidden-dice"},getCountryCount(e){const t=this.$store.state.countries.get(e);if(this.$store.state.phase===o.PHASE.DEPLOY){const a=this.$store.state.player,n=this.$store.state.players[a].actions.filter(t=>t.id===e).length;return t.count+n}return t.count},getCountryClasses(e){const{$store:{state:t}}=this,a=this.$store.state.countries.get(e),n=["country"];return t.phase===o.PHASE.DEPLOY?(!0===a.selected&&null===t.action.to&&a.owner===t.player||t.action.to===e)&&n.push("selected"):t.phase===o.PHASE.ATTACK?(!0===a.selected&&null===t.action.from&&a.owner===t.player&&a.count>1||!0===a.selected&&null===t.action.to&&a.owner!==t.player&&u(t.action.from,e))&&n.push("selected"):t.phase===o.PHASE.MOVE&&(!0===a.selected&&null===t.action.from&&a.owner===t.player&&a.count>1||!0===a.selected&&null===t.action.to&&a.owner===t.player&&u(t.action.from,e))&&n.push("selected"),n},getTroopClasses(e){const t=this.$store.state.countries.get(e),a=["troop","player-"+t.owner];return t.selected&&a.push("selected"),a},onEnterCountry(e){const{$store:{dispatch:t}}=this;t("enterCountry",{id:e.target.id})},onLeaveCountry(e){const{$store:{dispatch:t}}=this;t("leaveCountry",{id:null})},onClickCountry(e){const{$store:{state:t,dispatch:a}}=this,n=t.player;t.players[n];t.phase===o.PHASE.DEPLOY?function(e,t){return t.countries.get(e).owner===t.player}(e.target.id,t)&&a("actionTo",{id:e.target.id}):t.phase===o.PHASE.ATTACK?null===t.action.from&&i(e.target.id,t)?a("actionFrom",{id:e.target.id}):null!==t.action.from&&null===t.action.to&&c(t.action.from,e.target.id,t)?a("actionTo",{id:e.target.id}):null!==t.action.from&&e.target.id===t.action.from&&a("actionFrom",{id:null}):t.phase===o.PHASE.MOVE&&(null===t.action.from&&i(e.target.id,t)?a("actionFrom",{id:e.target.id}):null!==t.action.from&&null===t.action.to&&s(t.action.from,e.target.id,t)?a("actionTo",{id:e.target.id}):null!==t.action.from&&e.target.id===t.action.from&&a("actionFrom",{id:null}))},async onClickContinue(e){const{$store:{dispatch:t,state:a}}=this;if(a.phase===o.PHASE.DEPLOY&&a.players[a.player].actions.length===a.players[a.player].newTroops){let e=await this.postState(a);console.log(e)}else if(a.phase===o.PHASE.ATTACK||a.phase===o.PHASE.MOVE){let e=await this.postState(a);console.log(e)}},onClickPlus(e){const{$store:{dispatch:t,state:a}}=this;a.phase!==o.PHASE.ATTACK&&a.phase!==o.PHASE.MOVE||null===a.action.from||null===a.action.to?a.phase===o.PHASE.DEPLOY&&t("deployTroop"):t("actionIncrement")},onClickMinus(e){const{$store:{dispatch:t,state:a}}=this;a.phase!==o.PHASE.ATTACK&&a.phase!==o.PHASE.MOVE||null===a.action.from||null===a.action.to?a.phase===o.PHASE.DEPLOY&&t("gatherTroop"):t("actionDecrement")}},computed:{turn(){const{$store:{state:e}}=this;return`${r.i18n.en.turn}: ${e.turn}`},canContinue(){const{$store:{state:e}}=this,t=e.player,a=e.players[t];return e.phase===o.PHASE.DEPLOY&&a.newTroops>a.actions.length},canAdd(){const{$store:{state:e}}=this;return!(e.phase===o.PHASE.DEPLOY&&null!==e.action.to&&e.players[e.player].actions.length<e.players[e.player].newTroops)&&!((e.phase===o.PHASE.ATTACK||e.phase===o.PHASE.MOVE)&&null!==e.action.from&&null!==e.action.to)},canSubtract(){const{$store:{state:e}}=this;return!(e.phase===o.PHASE.DEPLOY&&null!==e.action.to&&e.players[e.player].actions.length>0)&&!((e.phase===o.PHASE.ATTACK||e.phase===o.PHASE.MOVE)&&null!==e.action.from&&null!==e.action.to)},canAddOrSubtract(){const{$store:{state:e}}=this;return!((e.phase===o.PHASE.ATTACK||e.phase===o.PHASE.MOVE)&&null!==e.action.from&&null!==e.action.to)},countries(){return this.$store.state.countries},playerTurn(){return this.$store.state.playerId===this.$store.state.players[this.$store.state.player].id},gameStarted(){return this.$store.state.phase!==o.PHASE.CREATED},gameOver(){return 0===this.$store.state.winner||1===this.$store.state.winner},getWinner(){return this.$store.state.winner},playerName(){return`${r.i18n.en.player}: ${r.i18n.en.players[this.$store.state.player]}`},phaseName(){const{$store:{state:e}}=this,t=r.i18n.en.phases[e.phase];if(e.phase===o.PHASE.DEPLOY){const a=e.players[e.player].actions.length,n=e.players[e.player].newTroops;return`${r.i18n.en.phase}: ${t} (${a}/${n})`}return null!==e.action.from?null!==e.action.to?`${r.i18n.en.phase}: ${t} ${r.i18n.en.from} ${e.action.from} ${r.i18n.en.to} ${e.action.to}`:null!==e.country?`${r.i18n.en.phase}: ${t} ${r.i18n.en.from} ${e.action.from} ${r.i18n.en.to} ${e.country}`:`${r.i18n.en.phase}: ${t} ${r.i18n.en.from} ${e.action.from}`:`${r.i18n.en.phase}: ${t}`},countryName(){const{$store:{state:e}}=this;return e.country?`${r.i18n.en.country}: ${r.i18n.en.countries.get(e.country)}`:""},buttonText(){const{$store:{state:e}}=this;return e.phase===o.PHASE.DEPLOY?"Deploy":e.phase===o.PHASE.ATTACK?null===e.action.from?"Next":null!==e.action.to?`Attack with ${e.action.count} troops`:"Attack":e.phase===o.PHASE.MOVE?null===e.action.from?"Next":null!==e.action.to?`Move ${e.action.count} troops`:"Move":void 0},minusText:()=>r.i18n.en.minus,plusText:()=>r.i18n.en.plus,warningText:()=>"Warning",warningClasses:()=>"visible",actionClasses(){return"player-"+this.$store.state.player},actionStyle(){const{$store:{state:e}}=this;if(null!==e.action.from){const[t,a]=o.COUNTRY_COORDINATES.get(e.action.from);if(null!==e.action.to){const[n,r]=o.COUNTRY_COORDINATES.get(e.action.to),i=n-t,s=r-a;return{strokeWidth:1/(Math.sqrt(i*i+s*s)/150)*1.5}}if(null!==e.country){const[n,r]=o.COUNTRY_COORDINATES.get(e.country),i=n-t,s=r-a;return{strokeWidth:1/(Math.sqrt(i*i+s*s)/150)*1.5}}}return{strokeWidth:1.5}},actionTransform(){const{$store:{state:e}}=this;if(null!==e.action.from){const[t,a]=o.COUNTRY_COORDINATES.get(e.action.from);if(null!==e.action.to){const[n,r]=o.COUNTRY_COORDINATES.get(e.action.to),i=n-t,s=r-a,c=Math.sqrt(i*i+s*s)/150;return`translate(${t},${a}) rotate(${l(Math.atan2(s,i))}) scale(${c},${c})`}if(null!==e.country&&e.phase===o.PHASE.ATTACK&&c(e.action.from,e.country,e)||e.phase===o.PHASE.MOVE&&s(e.action.from,e.country,e)){const[n,r]=o.COUNTRY_COORDINATES.get(e.country),i=n-t,s=r-a,c=Math.sqrt(i*i+s*s)/150;return`translate(${t},${a}) rotate(${l(Math.atan2(s,i))}) scale(${c},${c})`}return"scale(0,0)"}return"scale(0,0)"}}})},,,,,,,function(e,t){e.exports={messageEvent:e=>"NEW MESSAGE "+e,lobbyEvent:()=>"LOBBY EVENT",gameEvent:e=>"GAME EVENT "+e}}]);