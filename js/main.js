"use strict";

$(function () {
  /* =================== */
  /*        wipein       */
  /* =================== */
  //wipeクラスにinクラスを追加する//
  $(".wipe").addClass("in");


  // MEMO)
  // addClass : https://uxmilk.jp/9231

  /* =================== */
  /*     back-to-top     */
  /* =================== */


  // 1. クリックした時にトップに戻る
  //#back-to-topをkyリックしたときに
  $("#back-to-top").click(function () {
    $("html,body").animate({
      scrollTop: 0,
    }, 600);
  });
  //Webページの全体を0.6秒かけてscrolltopをゼロにする1000分の1秒

  // 2. 一定量スクロールしたら、back-to-topを表示
  // 画面をスクロールした時に、
  $(window).scroll(function () {
    // スクロール量
    let scroll = $(window).scrollTop();
    // 画面1枚分の高さ
    let wh = $(window).height();

    // もしスクロール量が、画面の高さ1枚分を超えたら、
    if (scroll > wh) {
      // #back-to-topにinクラスをつける
      $("#back-to-top").addClass("in");
    } else { // スクロール量が、画面の高さ1枚分を超えなかったら、(トップにいる間は)
      // #back-to-topからinクラスを外す
      $("#back-to-top").removeClass("in");
    }
  });

  // MEMO)
  // click     : https://uxmilk.jp/10065
  // animate   : https://uxmilk.jp/40486
  // scrollTop : https://uxmilk.jp/44962
  // MEMO)
  // scroll : https://www.task-notes.com/entry/20150605/1433473200
  // height : https://uxmilk.jp/40801


  /* =================== */
  /*   	  hamburger      */
  /* =================== */
  //ID=#
  // ハンバーガーメニューをクリックした時に、
  $("#hamburger").click(function () {
    // 1. ナビゲーションの表示/非表示
    $(".header-nav").fadeToggle();
    // fadein,feadout=fadetoggle
    // 2. ハンバーガーメニューの形の切り替え
    $("#hamburger").toggleClass("active");
    // $("this").toggleClass("active");でもおｋ
    // 3. スクロール防止
    $("body").toggleClass("hidden");
  });


  /* =================== */
  /*    	  header       */
  /* =================== */
  // 画面一枚分スクロールした時に、headerを固定
  // スクロール量が１画面分の高さを超えたら
  // headerにfixクラスをつける

  // そうじゃなかったら(トップにいるときは)
  // headerからfixクラスを外す

  // 画面をスクロールした時に、
  $(window).scroll(function () {
    // スクロール量
    let scroll = $(window).scrollTop();
    // 画面１枚分の高さ
    let wh = $(window).height();

    if (scroll > wh) {
      $("header").addClass("fix");
    } else {
      $("header").removeClass("fix");
    }
  });




  /* =================== */
  /*   	  slideshow      */
  /* =================== */

  let nowPage = 0; // 現在の画像
  let nextPage = 1; // 次の画像
  const slides = $("#slideshow img");
  const slideLength = slides.length; // 4
  const fadeTime = 1500; // 1.5s
  const showTime = 3000; // 3s
  // hideの逆のメソット
  // 全ての画像を非表示
  slides.hide();
  // 1枚目の画像のみ表示
  slides.eq(0).show();

  // インデックス番号 = 0,1,2,3

  // 関数 = 処理をひとまとまりにしたもの
  // 関数定義
  const slideshow = () => {
    // (0 + 1) % 4 = 1
    // (1 + 1) % 4 = 2
    // (2 + 1) % 4 = 3
    // (3 + 1) % 4 = 0
    // 処理
    // 今の画像を1.5秒かけて非表示にして、次の画像を1.5秒かけて表示する
    slides.eq(nowPage).fadeOut(fadeTime);
    slides.eq(nextPage).fadeIn(fadeTime);
    nowPage = nextPage;
    // 3秒おきに繰り返しslideshow関数を呼び出す
    setInterval(slideshow, showTime);
  }


  // 関数の呼び出し
  slideshow();

  /* =================== */
  /*   	   slidein       */
  /* =================== */
  // 何を、何した時に、(もし)、何の、何が、どうなる

  // 画面を、スクロールした時に、
  // サービスのセクションに達したら、slideクラスにinクラスをつける。

  // let tp = $(".slide-trigger").offset().top;
  // $(window).scroll(function () {
  $(window).scroll(function () {
    $(".slide-trigger").each(function () {
      // サイト上部から.slide-triggerまでの距離
      let tp = $(this).offset().top - $(window).height() / 2;
      // スクロール量
      let scroll = $(window).scrollTop();

      if (scroll > tp) {
        $(this).find(".slide").addClass("in");
      }
    });
  });

  /* =================== */
  /*    carousel panel   */
  /* =================== */

  // DOM取得
  const carousel = $("#carousel"); // #carousel
  const carouselItem = carousel.find("li"); // #carouselの子孫要素 li
  const prev = $("#prev"); // #prev前
  const next = $("#next"); // #next次

  // 値の取得
  const length = carouselItem.length; // li7個数の取得
  const carouselWidth = carouselItem.width(); // 370li1子分の幅
  const innerWidth = carouselWidth * length; // 370*7=2590ulの大きさを取得
  const time = 400; // 処理を行う時間

  // c：countの略。このcの値を変化させて移動を行う。li1個分
  let c = 1;

  /* ------------------------------ */

  // nextボタンをクリックした時、
  next.click(function () {
    // もしcの値がlengthと一致したら、
    if (c == length) {

      // 処理（1~6はスキップ）
      carousel.stop().animate(
        {
          // 一番最初に戻す
          left: 0, // Q. leftの値を変更する。
        },
        time // 0.4秒かけて
      );
      c = 1;
      // Q.
      // cの値を変更;
    } else { // 一致しなかったら

      // #carouselを、ulを
      carousel.stop().animate(
        {
          left: -c * carouselWidth, // leftの値を変更する。li1個分左に行く作業－370
        },
        time // 0.4秒かけて
      );

      c++; // ++：1ずつ足す-370+(-370)...一回押すごとにずれていく
    }
  });

  /* ------------------------------ */

  // prevボタンをクリックした時、
  prev.click(function () {
    // cが一番最初の時、
    if (c == 1) {
      // 一番最後のパネルに移動
      carousel.stop().animate(
        {
          left: carouselWidth - innerWidth,
        },
        time
      );
      c = length;

      // もし＝7だとli増えた時値が変わらない
      // cが最初の時、
      // 一番最後のパネルに移動
      // ・innerWidth   ：ul全体の横幅
      // ・carouselWidth：liひとつ分の横幅
    } else { // 2 ~ 7
      // ひとパネルずつ戻る
      carousel.stop().animate(
        {
          left: -(c - 2) * carouselWidth, // -1850
        },
        time
      );

      // ひとパネル戻ったらcの値は1つずつ戻す。
      c--;
    }
  });

  /* ------------------------------ */

  /*
    MEMO：
    【stop】
    https://nkmrkisk.com/archives/71
    【animate】
    https://uxmilk.jp/40486
    【++ (インクリメント)】
    https://www.javadrive.jp/javascript/ope/index6.html
    【click】
    https://uxmilk.jp/10065
  */

  /* =================== */
  /*       parallax      */
  /* =================== */

  // パララックス：「視差効果」
  // 参考サイト：https://comme.fit/

  /*
  作り方：
  1. スクロールイベントを作成
  2. スクロール量を取得
  －だと離れていく動く＋だと付いてくる
  3. スクロール量を割った値を、動かしたい要素の「transform: translateY(ここ)」に代入
  */

  // 書いてみよう！
  // 1.
  $(window).scroll(function () {
    // 2.
    let value = -$(window).scrollTop() / 40;

    // 3.
    $(".parallax").css({
      transform: "translateY(" + value + "%)",
    });
  });



});


