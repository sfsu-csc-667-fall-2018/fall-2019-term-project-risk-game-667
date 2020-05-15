!function(t){var e={};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=88)}({8:function(t,e){t.exports={messageEvent:t=>"NEW MESSAGE "+t,lobbyEvent:()=>"LOBBY EVENT",gameEvent:t=>"GAME EVENT "+t}},88:function(t,e,a){"use strict";a.r(e);var n=a(8);const r={en:{phases:["Deploy troops","Attack!","Move Troops","Created","Finished"],players:["Red","Green"],turn:"Turn",from:"from",to:"to",minus:"-",plus:"+",player:"Player",phase:"Phase",country:"Country",countries:new Map([["great-britain","Gran Britain"],["iceland","Iceland"],["northern-europe","Northern Europe"],["southern-europe","Southern Europe"],["scandinavia","Scandinavia"],["ukraine","Ukraine"],["western-europe","Western Europe"],["afghanistan","Afganistan"],["india","India"],["irkutsk","Irkutsk"],["kamchatka","Kamchatka"],["middle-east","Middle East"],["mongolia","Mongolia"],["siam","Siam"],["china","China"],["japan","Japan"],["siberia","Siberia"],["ural","Ural"],["yakutsk","Yakutsk"],["east-africa","Eastern Africa"],["egypt","Egypt"],["congo","Congo"],["madagascar","Madagascar"],["south-africa","Southern África"],["north-africa","Northern África"],["alaska","Alaska"],["alberta","Alberta"],["central-america","Central America"],["eastern-united-states","Eastern US"],["greenland","Greenland"],["northwest-territory","Northwest"],["ontario","Ontario"],["western-united-states","Western US"],["quebec","Quebec"],["argentina","Argentina"],["brazil","Brasil"],["peru","Peru"],["venezuela","Venezuela"],["eastern-australia","Eastern Australia"],["new-guinea","New Guinea"],["western-australia","Western Australia"],["indonesia","Indonesia"]])}},o=new Map([["east-africa",[574.401,450]],["egypt",[517.5,361.5]],["congo",[506.535,483.5]],["madagascar",[589.75,563.5]],["south-africa",[516.014,566.5]],["north-africa",[450.803,389.5]],["afghanistan",[660.305,253.145]],["india",[710.5,373.739]],["irkutsk",[819.499,188.86]],["kamchatka",[933,161]],["middle-east",[595,348.5]],["mongolia",[837.375,241]],["siam",[781.5,380]],["china",[769,300]],["japan",[908,242.5]],["siberia",[749,152.618]],["ural",[685.77,172.108]],["yakutsk",[855.5,119.5]],["eastern-australia",[908,557]],["new-guinea",[921.5,466.343]],["western-australia",[805.5,552.5]],["indonesia",[820.5,445.5]],["great-britain",[434.856,204.549]],["iceland",[433,147.672]],["northern-europe",[489,218.447]],["scandinavia",[499.5,138.5]],["southern-europe",[503.073,275]],["ukraine",[585,193.5]],["western-europe",[442,269.5]],["alaska",[68,137.451]],["alberta",[161.5,178]],["central-america",[186,319]],["eastern-united-states",[255,255]],["greenland",[358.5,95.9053]],["northwest-territory",[177.033,113.5]],["ontario",[250.5,196.056]],["western-united-states",[180.126,246]],["quebec",[321.5,189.5]],["argentina",[246,565.319]],["brazil",[321.267,455.5]],["peru",[208.951,464]],["venezuela",[233,373.5]]]),s=new Map([["great-britain",["iceland","scandinavia","northern-europe","western-europe"]],["iceland",["greenland","scandinavia","great-britain"]],["northern-europe",["southern-europe","western-europe","scandinavia","ukraine","great-britain"]],["southern-europe",["western-europe","northern-europe","ukraine","middle-east","egypt","north-africa"]],["scandinavia",["iceland","ukraine","northern-europe","great-britain"]],["ukraine",["ural","afghanistan","middle-east","southern-europe","northern-europe","scandinavia"]],["western-europe",["great-britain","southern-europe","northern-europe","north-africa"]],["afghanistan",["ural","china","india","middle-east","ukraine"]],["india",["china","siam","middle-east","afghanistan"]],["irkutsk",["yakutsk","mongolia","kamchatka","siberia"]],["kamchatka",["alaska","yakutsk","irkutsk","mongolia","japan"]],["middle-east",["southern-europe","egypt","ukraine","afghanistan","india","east-africa"]],["mongolia",["china","japan","irkutsk","siberia","kamchatka"]],["siam",["india","china","indonesia"]],["china",["india","siam","mongolia","afghanistan","ural","siberia"]],["japan",["mongolia","kamchatka"]],["siberia",["ural","china","yakutsk","irkutsk","mongolia"]],["ural",["ukraine","afghanistan","china","siberia"]],["yakutsk",["irkutsk","siberia","kamchatka"]],["east-africa",["middle-east","egypt","madagascar","congo","north-africa","south-africa"]],["egypt",["north-africa","middle-east","east-africa","southern-europe"]],["congo",["east-africa","south-africa","north-africa"]],["madagascar",["east-africa","south-africa"]],["south-africa",["madagascar","east-africa","congo"]],["north-africa",["western-europe","southern-europe","east-africa","egypt","congo","brazil"]],["alaska",["kamchatka","northwest-territory","alberta"]],["alberta",["ontario","alaska","northwest-territory","western-united-states"]],["central-america",["western-united-states","eastern-united-states","venezuela"]],["eastern-united-states",["western-united-states","central-america","quebec","ontario"]],["greenland",["iceland","northwest-territory","ontario","quebec"]],["northwest-territory",["alaska","alberta","ontario","greenland"]],["ontario",["alberta","northwest-territory","quebec","western-united-states","eastern-united-states","greenland"]],["western-united-states",["eastern-united-states","ontario","alberta","central-america"]],["quebec",["ontario","greenland","eastern-united-states"]],["argentina",["brazil","peru"]],["brazil",["argentina","peru","north-africa","venezuela"]],["peru",["venezuela","argentina","brazil"]],["venezuela",["brazil","peru","central-america"]],["eastern-australia",["western-australia","new-guinea"]],["new-guinea",["eastern-australia","indonesia"]],["western-australia",["eastern-australia","new-guinea","indonesia"]],["indonesia",["siam","new-guinea","western-australia","eastern-australia"]]]),i=0,c=1,u=2,l=3,p=(Math.PI,180/Math.PI);function h(t,e){const a=e.countries.get(t);return a.owner===e.player&&a.count>1}function d(t,e,a){return!!y(t,e)&&a.countries.get(e).owner===a.countries.get(t).owner}function m(t,e,a){return!!y(t,e)&&a.countries.get(e).owner!==a.countries.get(t).owner}function y(t,e){let a=s.get(t);return!!a&&a.includes(e)}function g(t){return t*p}const f=new Vuex.Store({state:{winner:null,playerId:null,country:null,action:{from:null,to:null,count:0},result:null,turn:0,phase:l,player:0,players:[],countries:[]},mutations:{updateState(t,e){console.log("UPDATED A GAME STATE",e.state),t.winner=e.state.winner,t.playerId=e.state.playerId,t.action=e.state.action,t.result=e.state.result,t.turn=e.state.turn,t.phase=e.state.phase,t.player=e.state.player,t.players=e.state.players,t.countries=e.state.countries},enterCountry(t,e){t.country=e.id,t.countries.get(t.country).selected=!0},leaveCountry(t,e){t.countries.get(t.country).selected=!1,t.country=e.id},deployTroop(t,e){t.players[t.player].actions.push({id:t.action.to})},gatherTroop(t){const e=t.players[t.player].actions.findIndex(e=>e.id===t.action.to);e<0&&console.error("Cannot retrieve troops");const[a]=t.players[t.player].actions.splice(e,1)},actionFrom(t,e){t.action.from=e.id},actionTo(t,e){t.action.to=e.id},actionIncrement(t){t.countries.get(t.action.from).count-t.action.count>1&&t.action.count++},actionDecrement(t){t.action.count>1&&t.action.count--}},actions:{updateState(t,e){t.commit("updateState",e)},enterCountry(t,e){t.commit("enterCountry",e)},leaveCountry(t,e){t.commit("leaveCountry",e)},deployTroop(t,e){t.commit("deployTroop",e)},gatherTroop(t,e){t.commit("gatherTroop",e)},moveFrom(t,e){t.commit("moveFrom",e)},moveTo(t,e){t.commit("moveTo",e)},actionFrom(t,e){t.commit("actionFrom",e)},actionTo(t,e){t.commit("actionTo",e)},actionIncrement(t){t.commit("actionIncrement")},actionDecrement(t){t.commit("actionDecrement")}}});let $=t=>({winner:t.winner,playerId:t.playerId,action:t.action,result:t.result,turn:t.turn,phase:t.phase,player:t.player,players:t.players,countries:[...t.countries]});const w=function(){let t=window.location.pathname.split("/");return t[t.length-1]}(),k=(new Vue({el:"#app",store:f,mounted:async function(){let t=await this.getState();const{$store:{dispatch:e}}=this;e("updateState",{state:t}),k.on(Object(n.gameEvent)(w),async t=>{const{$store:{dispatch:e}}=this;e("updateState",{state:await this.getState()})})},methods:{async getState(){let t=await axios.get(`/game/${w}/update`);return{winner:(e=t.data.state).winner,playerId:e.playerId,action:e.action,result:e.result,turn:e.turn,phase:e.phase,player:e.player,players:e.players,countries:new Map(e.countries)};var e},postState:async t=>(console.log("SENDING A GAME STATE",t),(await axios.post(`/game/${w}/update`,{state:$(t)})).data),getDiceClasses(t,e){const{$store:{state:a}}=this;if(this.$store.state.result){if("attack"===t)return["attack-dice","dice-value-"+a.result[t][e]];if("defense"===t)return["defense-dice","dice-value-"+a.result[t][e]]}return"hidden-dice"},getCountryCount(t){const e=this.$store.state.countries.get(t);if(this.$store.state.phase===i){const a=this.$store.state.player,n=this.$store.state.players[a].actions.filter(e=>e.id===t).length;return e.count+n}return e.count},getCountryClasses(t){const{$store:{state:e}}=this,a=this.$store.state.countries.get(t),n=["country"];return e.phase===i?(!0===a.selected&&null===e.action.to&&a.owner===e.player||e.action.to===t)&&n.push("selected"):e.phase===c?(!0===a.selected&&null===e.action.from&&a.owner===e.player&&a.count>1||!0===a.selected&&null===e.action.to&&a.owner!==e.player&&y(e.action.from,t))&&n.push("selected"):e.phase===u&&(!0===a.selected&&null===e.action.from&&a.owner===e.player&&a.count>1||!0===a.selected&&null===e.action.to&&a.owner===e.player&&y(e.action.from,t))&&n.push("selected"),n},getTroopClasses(t){const e=this.$store.state.countries.get(t),a=["troop","player-"+e.owner];return e.selected&&a.push("selected"),a},onEnterCountry(t){const{$store:{dispatch:e}}=this;e("enterCountry",{id:t.target.id})},onLeaveCountry(t){const{$store:{dispatch:e}}=this;e("leaveCountry",{id:null})},onClickCountry(t){const{$store:{state:e,dispatch:a}}=this,n=e.player;e.players[n];e.phase===i?function(t,e){return e.countries.get(t).owner===e.player}(t.target.id,e)&&a("actionTo",{id:t.target.id}):e.phase===c?null===e.action.from&&h(t.target.id,e)?a("actionFrom",{id:t.target.id}):null!==e.action.from&&null===e.action.to&&m(e.action.from,t.target.id,e)?a("actionTo",{id:t.target.id}):null!==e.action.from&&t.target.id===e.action.from&&a("actionFrom",{id:null}):e.phase===u&&(null===e.action.from&&h(t.target.id,e)?a("actionFrom",{id:t.target.id}):null!==e.action.from&&null===e.action.to&&d(e.action.from,t.target.id,e)?a("actionTo",{id:t.target.id}):null!==e.action.from&&t.target.id===e.action.from&&a("actionFrom",{id:null}))},async onClickContinue(t){const{$store:{dispatch:e,state:a}}=this;if(a.phase===i&&a.players[a.player].actions.length===a.players[a.player].newTroops){let t=await this.postState(a);console.log(t)}else if(a.phase===c||a.phase===u){let t=await this.postState(a);console.log(t)}},onClickPlus(t){const{$store:{dispatch:e,state:a}}=this;a.phase!==c&&a.phase!==u||null===a.action.from||null===a.action.to?a.phase===i&&e("deployTroop"):e("actionIncrement")},onClickMinus(t){const{$store:{dispatch:e,state:a}}=this;a.phase!==c&&a.phase!==u||null===a.action.from||null===a.action.to?a.phase===i&&e("gatherTroop"):e("actionDecrement")}},computed:{turn(){const{$store:{state:t}}=this;return`${r.en.turn}: ${t.turn}`},canContinue(){const{$store:{state:t}}=this,e=t.player,a=t.players[e];return t.phase===i&&a.newTroops>a.actions.length},canAdd(){const{$store:{state:t}}=this;return!(t.phase===i&&null!==t.action.to&&t.players[t.player].actions.length<t.players[t.player].newTroops)&&!((t.phase===c||t.phase===u)&&null!==t.action.from&&null!==t.action.to)},canSubtract(){const{$store:{state:t}}=this;return!(t.phase===i&&null!==t.action.to&&t.players[t.player].actions.length>0)&&!((t.phase===c||t.phase===u)&&null!==t.action.from&&null!==t.action.to)},canAddOrSubtract(){const{$store:{state:t}}=this;return!((t.phase===c||t.phase===u)&&null!==t.action.from&&null!==t.action.to)},countries(){return this.$store.state.countries},playerTurn(){return this.$store.state.playerId===this.$store.state.players[this.$store.state.player].id},gameStarted(){return this.$store.state.phase!==l},gameOver(){return 0===this.$store.state.winner||1===this.$store.state.winner},getWinner(){return this.$store.state.winner},playerName(){return`${r.en.player}: ${r.en.players[this.$store.state.player]}`},phaseName(){const{$store:{state:t}}=this,e=r.en.phases[t.phase];if(t.phase===i){const a=t.players[t.player].actions.length,n=t.players[t.player].newTroops;return`${r.en.phase}: ${e} (${a}/${n})`}return null!==t.action.from?null!==t.action.to?`${r.en.phase}: ${e} ${r.en.from} ${t.action.from} ${r.en.to} ${t.action.to}`:null!==t.country?`${r.en.phase}: ${e} ${r.en.from} ${t.action.from} ${r.en.to} ${t.country}`:`${r.en.phase}: ${e} ${r.en.from} ${t.action.from}`:`${r.en.phase}: ${e}`},countryName(){const{$store:{state:t}}=this;return t.country?`${r.en.country}: ${r.en.countries.get(t.country)}`:""},buttonText(){const{$store:{state:t}}=this;return t.phase===i?"Deploy":t.phase===c?null===t.action.from?"Next":null!==t.action.to?`Attack with ${t.action.count} troops`:"Attack":t.phase===u?null===t.action.from?"Next":null!==t.action.to?`Move ${t.action.count} troops`:"Move":void 0},minusText:()=>r.en.minus,plusText:()=>r.en.plus,warningText:()=>"Warning",warningClasses:()=>"visible",actionClasses(){return"player-"+this.$store.state.player},actionStyle(){const{$store:{state:t}}=this;if(null!==t.action.from){const[e,a]=o.get(t.action.from);if(null!==t.action.to){const[n,r]=o.get(t.action.to),s=n-e,i=r-a;return{strokeWidth:1/(Math.sqrt(s*s+i*i)/150)*1.5}}if(null!==t.country){const[n,r]=o.get(t.country),s=n-e,i=r-a;return{strokeWidth:1/(Math.sqrt(s*s+i*i)/150)*1.5}}}return{strokeWidth:1.5}},actionTransform(){const{$store:{state:t}}=this;if(null!==t.action.from){const[e,a]=o.get(t.action.from);if(null!==t.action.to){const[n,r]=o.get(t.action.to),s=n-e,i=r-a,c=Math.sqrt(s*s+i*i)/150;return`translate(${e},${a}) rotate(${g(Math.atan2(i,s))}) scale(${c},${c})`}if(null!==t.country&&t.phase===c&&m(t.action.from,t.country,t)||t.phase===u&&d(t.action.from,t.country,t)){const[n,r]=o.get(t.country),s=n-e,i=r-a,c=Math.sqrt(s*s+i*i)/150;return`translate(${e},${a}) rotate(${g(Math.atan2(i,s))}) scale(${c},${c})`}return"scale(0,0)"}return"scale(0,0)"}}}),io())}});