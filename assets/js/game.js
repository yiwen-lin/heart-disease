var width = $(window).width();
var ua = navigator.userAgent.toLowerCase();
var iPad = navigator.userAgent.match(/iPad/i) != null;
var iPhone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var mobileSafari = (/iPhone/i.test(navigator.platform) || /iPod/i.test(navigator.platform) || /iPad/i.test(navigator.userAgent)) && !!navigator.appVersion.match(/(?:Version\/)([\w\._]+)/);
var Android = (navigator.userAgent.match(/android/i) != null);

let headerOffset = 56;
if ( width >=  992 ) {
  headerOffset = 70;
} else {
  headerOffset = 56;
}

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () { supportsPassive = true; }
	}));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

$('body').addClass('noscroll');
let testOffsetTop = $('#test').offset().top;
disableScroll();
$('.test-start').click(function () {
	// $('.op-block').slideUp(700);
	resetTest();
});

if( window.location.hash === '#feature' || window.location.hash === '#hospital' ) {
	enableScroll();
	$('body').removeClass('noscroll');
}

//改字內容
const quiz = [
	{
		title: '下列兩種情況，你比較符合哪一種？',
		id: 'test-q1',
		prev: 'test-q0',
		option: [
			{
				content: '突然胸痛',
				track: 'test-q1-a',
				next: 'test-q2',
				result: null
			},
			{
				content: '安靜時突然覺得心臟砰砰跳（運動或興奮時除外）',
				track: 'test-q1-b',
				next: 'test-q4',
				result: null
			}
		],
	},
	{
		title: '下列兩種情況，你比較符合哪一種？',
		id: 'test-q2',
		prev: 'test-q1',
		option: [
			{
				content: '有火燒心、胃不適症狀，喝水、吃胃藥就可緩解',
				track: 'test-q2-a',
				next: 'end',
				result: 'result-a',
			},
			{
				content: '有發燒症狀',
				track: 'test-q2-b',
				next: 'end',
				result: 'result-b',
			},
			{
				content: '沒有發燒，只有激烈且持續的胸痛',
				track: 'test-q2-c',
				next: 'test-q3',
				result: null
			}
		],
	},
	{
		title: '下列三種情況，哪一種比較符合你？',
		id: 'test-q3',
		prev: 'test-q2',
		option: [
			{
				content: '吸氣、吐氣時，胸部會痛，痛的地方手指得出來',
				track: 'test-q3-a',
				next: 'end',
				result: 'result-c',
			},
			{
				content: '疼痛從胸部移到背部及腰部',
				track: 'test-q3-b',
				next: 'end',
				result: 'result-d'
			},
			{
				content: '疼痛部位不明確，左肩、左手腕或胃、背部也同時會痛；且腳在運動時就痛，休息就會好，時間持續約 1~15 分鐘',
				track: 'test-q3-c',
				next: 'end',
				result: 'result-e'
			},
			{
				content: '以上皆否',
				track: 'test-q3-d',
				next: 'end',
				result: 'result-f'
			}
		],
	},
	{
		title: '你的脈搏為以下哪種？',
		id: 'test-q4',
		prev: 'test-q1',
		option: [
			{
				content: '＞100次／每分鐘',
				track: 'test-q4-a',
				next: 'test-q5',
				result: null
			},
			{
				content: '60~100次／每分鐘',
				track: 'test-q4-b',
				next: 'test-q6',
				result: null
			},
			{
				content: '＜60次／每分鐘',
				track: 'test-q4-c',
				next: 'end',
				result: 'result-g',
			}
		],
	},
	{
		title: '你的脈搏＞100 次／每分鐘，計算次數頻率屬於規則／不規則？',
		id: 'test-q5',
		prev: 'test-q4',
		option: [
			{
				content: '規則',
				track: 'test-q5-a',
				next: 'test-q7',
				result: null
			},
			{
				content: '不規則',
				track: 'test-q5-b',
				next: 'end',
				result: 'result-h'
			}
		],
	},
	{
		title: '你的脈搏 60~100 次／每分鐘，計算次數頻率屬於規則／不規則？',
		id: 'test-q6',
		prev: 'test-q4',
		option: [
			{
				content: '規則',
				track: 'test-q6-a',
				next: 'test-q8',
				result: null
			},
			{
				content: '不規則',
				track: 'test-q6-b',
				next: 'end',
				result: 'result-h'
			}
		],
	},
	{
		title: '下列兩種情況，哪一種較符合你？',
		id: 'test-q7',
		prev: 'test-q5',
		option: [
			{
				content: '突然發生，慢慢緩解',
				track: 'test-q7-a',
				next: 'end',
				result: 'result-i'
			},
			{
				content: '突然發生，瞬間緩解',
				track: 'test-q7-b',
				next: 'end',
				result: 'result-j'
			}
		],
	},
	{
		title: '下列兩種情況，哪一種較符合你？',
		id: 'test-q8',
		prev: 'test-q6',
		option: [
			{
				content: '兩、三下停一下',
				track: 'test-q8-a',
				next: 'end',
				result: 'result-k'
			},
			{
				content: '完全亂跳',
				track: 'test-q8-b',
				next: 'end',
				result: 'result-l'
			}
		],
	},
]

const resultArray = {
	'result-a': [{
		name: '胃食道逆流',
		link: 'https://kb.commonhealth.com.tw/library/40.html',
	}],
	'result-b': [{
		name: '心包膜炎',
		link: 'https://kb.commonhealth.com.tw/library/265.html',
	},{
		name: '心肌炎',
		link: 'https://kb.commonhealth.com.tw/library/262.html',
	},{
		name: '肺炎',
		link: 'https://kb.commonhealth.com.tw/library/36.html',
	},{
		name: '肌筋膜痛症候群',
		link: 'https://kb.commonhealth.com.tw/library/122.html',
	}],
	'result-c': [{
		name: '肌肉、骨骼或神經痛',
		link: 'https://kb.commonhealth.com.tw/library/122.html',
	}],
	'result-d': [{
		name: '主動脈剝離',
		link: 'https://kb.commonhealth.com.tw/library/270.html',
	},{
		name: '心肌梗塞',
		link: 'https://kb.commonhealth.com.tw/library/22.html',
	}],
	'result-e': [{
		name: '心絞痛',
		link: 'https://kb.commonhealth.com.tw/library/69.html',
	}],
	'result-f': [{
		name: '心肌梗塞',
		link: 'https://kb.commonhealth.com.tw/library/22.html',
	}],
	'result-g': [{
		name: '病竇症候群',
		link: 'https://kb.commonhealth.com.tw/library/593.html',
	},{
		name: '房室傳導阻滯',
		link: 'https://kb.commonhealth.com.tw/library/562.html',
	}],
	'result-h': [{
		name: '心房纖維顫動心房撲動',
		link: 'https://kb.commonhealth.com.tw/library/21.html',
	}],
	'result-i': [{
		name: '竇性心搏過速',
		link: 'https://kb.commonhealth.com.tw/library/593.html',
	}],
	'result-j': [{
		name: '陣發性上心室心搏過速',
		link: 'https://kb.commonhealth.com.tw/library/593.html',
	}, {
		name: '期外收縮',
		link: 'https://kb.commonhealth.com.tw/library/559.html',
	}],
	'result-k': [{
		name: '期外收縮',
		link: 'https://kb.commonhealth.com.tw/library/559.html',
	}],
	'result-l': [{
		name: '緊張、焦慮情緒疾病',
		link: 'https://kb.commonhealth.com.tw/library/427.html',
	}, {
		name: '更年期引發的心悸',
		link: 'https://kb.commonhealth.com.tw/library/64.html',
	}],
}

function insertQuiz() {
	let string = ``;
	quiz.forEach(item => {
		let options = ``;
		item.option.forEach(element => {
			// console.log(element);
			options += `<button type="button" class="test-btn" data-next="${element.next}"
				data-result="${element.result}"
				data-category="web_web" data-action="2022CVD" data-label="${element.track}
			">${element.content}</button>`;
		});
		string += `<div class="container outer"><div class="row"><div class="inner" id="${item.id}">
			<h3>${item.title}</h3>
			${options}
			<button type="button" class="pre-btn" data-prev="${item.prev}">回上一題</button>
			</div></div></div>`;
	});
	$('#test .test-inner').html(string);
}
insertQuiz();

function goResult(val) {
	let resultDisease = resultArray[val];
	let str = '';
	resultDisease.forEach(element => {
		str += `<div class="result-circle">
			<a href="${element.link}" target="_blank">
				<div class="disease-name">${element.name}</div>
				<h6>認識疾病 →</h6>
			</a>
		</div>`;
	});
	$('#resultSection .disease-block').html(str);
	$('#resultSection').show();
	$([document.documentElement, document.body]).animate({
		scrollTop: $('#resultSection').offset().top - 100
	}, 500);
	enableScroll();
	$('body').removeClass('noscroll');
}

function backPrev(val) {
	console.log(val);
	let index = val.split('-q')[1];
	let outerHeight = $('#test .outer').height();
	$('#test .test-inner').animate({
		scrollTop: (index-1) * outerHeight
	}, 0);
}

function resetTest() {
	$('#test .test-inner').animate({
		scrollTop: 0 * outerHeight
	}, 0);
	$([document.documentElement, document.body]).animate({
		scrollTop: $('#test').offset().top - headerOffset
	}, 500);
	$('#resultSection').hide();
	disableScroll();
	$('body').addClass('noscroll');
}

$('.navbar-nav li a').click(function () {
	if ( $(this).attr('id') === 'playTest' ) {
		disableScroll();
		$('body').addClass('noscroll');
	} else {
		enableScroll();
		$('body').removeClass('noscroll');
	}
})

$('#test .test-btn').click(function() {
	let prev = $(this).siblings('.pre-btn').attr('data-prev');
	let next = $(this).attr('data-next');
	let index = next.split('-q')[1];
	let result = $(this).attr('data-result');
	let outerHeight = $('#test .outer').height();
	if ( next !== 'end' ) {
		$('#test .test-inner').animate({
			scrollTop: (index-1) * outerHeight
		}, 0);
	} else {
		goResult(result);
	}
});

$('#test .pre-btn').click(function() {
	let prev = $(this).attr('data-prev');
	backPrev(prev);
});

$('#test-again').click(function() {
	resetTest();
});
