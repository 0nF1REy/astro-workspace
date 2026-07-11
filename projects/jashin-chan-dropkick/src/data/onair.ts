export const onair3rdBroadcastRows = [
  { channel: "テレビ東京", schedule: "2022年7月5日（火）26:05〜" },
  { channel: "北海道文化放送", schedule: "2022年7月6日（水）25:40〜" },
  { channel: "テレビ長崎", schedule: "2022年7月14日（木）25:00〜" },
  { channel: "BS日テレ", schedule: "2022年7月6日（水）24:30〜" },
  { channel: "BSフジ", schedule: "2022年7月7日（木）24:30〜" },
  {
    channel: "AT-X",
    schedule: {
      main: "2022年7月8日（金）22:00〜",
      repeat: "毎週（火）10：00、（木）16：00リピート放送",
    },
  },
];

export const onair3rdBroadcast = {
  title: "3期 テレビ放送情報！",
  rows: onair3rdBroadcastRows,
  note: "※放送・配信日時は編成の都合等により変更となる場合がございます。予めご了承ください。",
};

export const onair3rdStreamingSections = [
  {
    title: "月額見放題サービス（SVOD）",
    links: [
      { name: "ABEMAプレミアム", url: "https://abema.tv/video/title/19-98" },
      {
        name: "Amazon Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0B5KP67W4/ref=atv_dp_share_cu_r",
      },
      {
        name: "dアニメストア",
        url: "https://animestore.docomo.ne.jp/animestore/ci_pc?workId=25690",
      },
      {
        name: "dアニメストア ニコニコ支店",
        url: "https://www.nicovideo.jp/watch/so40723975",
      },
      {
        name: "dアニメストア for Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0B5KP67W4/ref=atv_dp_share_cu_r",
      },
      { name: "FOD", url: "https://fod.fujitv.co.jp/title/0027" },
      { name: "Hulu", url: "https://www.hulu.jp/watch/100116515" },
      {
        name: "J:COMオンデマンド",
        url: "https://linkvod.myjcom.jp/video/sr00147274?type=series",
      },
      { name: "TELASA", url: "https://www.telasa.jp/series/12705" },
      { name: "milplus", url: "https://front.milplus.jp/pg/10047383" },
      { name: "Paravi", url: "https://www.paravi.jp/title/96256" },
      {
        name: "TELASA（auスマートパスプレミアム）",
        url: "https://www.telasa.jp/series/12705",
      },
      { name: "U-NEXT", url: "https://video.unext.jp/title/SID0069681" },
      { name: "アニメカ", url: "https://animeka.tv/" },
      { name: "アニメ放題", url: "https://www.animehodai.jp/title/SID0069681" },
      { name: "バンダイチャンネル", url: "https://www.b-ch.com/titles/7799/" },
      {
        name: "ひかりTV",
        url: "https://www.hikaritv.net/video/series/Z3JvdXAvYjAwYzcwNg==",
      },
      {
        name: "ふらっと動画",
        url: "https://douga.flat-flat.jp/titles/S002555/1",
      },
    ],
  },
  {
    title: "無料配信サービス *各話期間限定（AVOD）",
    links: [
      { name: "ABEMA", url: "https://abema.tv/video/title/19-98" },
      {
        name: "GYAO!",
        url: "https://gyao.yahoo.co.jp/title/62b01231-28ec-464f-a804-dea7b0f94d8e",
      },
      {
        name: "ニコニコチャンネル",
        url: "https://anime.nicovideo.jp/detail/jashinchan3/",
      },
      {
        name: "ニコニコ生放送",
        url: "https://anime.nicovideo.jp/detail/jashinchan3/",
      },
    ],
  },
  {
    title: "レンタル配信サービス（TVOD）",
    links: [
      {
        name: "Amazon Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0B5KP67W4/ref=atv_dp_share_cu_r",
      },
      {
        name: "DMM.com",
        url: "https://www.dmm.com/digital/videomarket/anime/-/detail/=/title_id=174W82/",
      },
      {
        name: "Google Play",
        url: "https://play.google.com/store/tv/show/%E9%82%AA%E7%A5%9E%E3%81%A1%E3%82%83%E3%82%93%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%82%AD%E3%83%83%E3%82%AF?id=vjG0VAHqN3o.P&hl=ja",
      },
      {
        name: "GYAO!ストア",
        url: "https://gyao.yahoo.co.jp/store/title/174W82",
      },
      { name: "HAPPY!動画", url: "https://a.happydouga.jp/web/pc/index.php" },
      { name: "music.jp", url: "https://music-book.jp/video/title/174W82" },
      { name: "Rakuten TV", url: "https://tv.rakuten.co.jp/content/422685/" },
      {
        name: "VIDEX",
        url: "https://www.videx.jp/detail/anime/v_a_ryosenmytheater/amyc0274_0000/index.htm?ref=search",
      },
      {
        name: "YouTube（レンタル）",
        url: "https://www.youtube.com/show/SC7oGgxD1Y2dBmwIXaJpMZjg?season=1&sbp=CgEx",
      },
      {
        name: "ビデオマーケット",
        url: "https://www.videomarket.jp/title/174W82",
      },
    ],
  },
];

export const onair3rdStreaming = {
  title: "3期 配信情報！",
  highlightText: "2022年7月6日（水）正午配信スタート！毎週（水）正午更新！",
  sections: onair3rdStreamingSections,
  note: "※配信サービスによって配信開始日が異なる場合がございます。",
};

export const onair2ndStreamingSections = [
  {
    title: "見放題",
    items: [
      {
        name: "Amazon Prime Video（見放題）",
        url: "https://www.amazon.co.jp/gp/video/detail/B086H94RSG/ref=atv_hm_hom_1_c_DEaieV_4_1",
        date: "2020年4月6日〜",
      },
      {
        name: "dアニメストア",
        url: "https://anime.dmkt-sp.jp/animestore/ci_pc?workId=24713",
        date: "2021年5月1日〜",
      },
      {
        name: "dアニメストア ニコニコ支店",
        url: "https://www.nicovideo.jp/watch/so38617117",
        date: "2021年5月1日〜",
      },
      {
        name: "dアニメストア for Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B086H7RNLM/ref=atv_dp_share_cu_r",
        date: "2021年5月7日〜",
      },
      {
        name: "FOD",
        url: "https://fod.fujitv.co.jp/s/genre/anime/ser5g45/",
        date: "2021年5月1日〜",
      },
      {
        name: "Hulu",
        url: "https://www.hulu.jp/dropkick-on-my-devil",
        date: "2021年5月1日〜",
      },
    ],
  },
  {
    title: "レンタル",
    items: [
      {
        name: "Amazon Prime Video（レンタル）",
        url: "https://www.amazon.co.jp/gp/video/detail/B086H7RNLM/ref=atv_dp_share_cu_r",
        date: "2020年4月6日〜",
      },
      {
        name: "HAPPY!動画",
        url: "https://a.happydouga.jp/web/",
        date: "2021年5月1日〜",
      },
      {
        name: "Rakuten TV",
        url: "https://tv.rakuten.co.jp/content/379953/",
        date: "2021年5月1日〜",
      },
      {
        name: "ビデオマーケット",
        url: "https://www.videomarket.jp/title/174R40",
        date: "2021年5月1日〜",
      },
      {
        name: "DMM.com",
        url: "https://www.dmm.com/digital/videomarket/anime/-/detail/=/title_id=174R40/",
        date: "2021年5月1日〜",
      },
      {
        name: "GYAO!ストア",
        url: "https://gyao.yahoo.co.jp/store/title/174R40",
        date: "2021年5月1日〜",
      },
      {
        name: "music.jp",
        url: "https://music-book.jp/video/title/174R40",
        date: "2021年5月1日〜",
      },
    ],
  },
];

export const onair2ndStreaming = {
  title: "2期 配信情報！",
  sections: onair2ndStreamingSections,
};

export const onair2ndBroadcastRows = [
  { channel: "TOKYO MX", schedule: "2020年4月6日（月）25:15～" },
  { channel: "北海道文化放送", schedule: "2020年4月7日（火）25:50～" },
  { channel: "西日本放送", schedule: "2020年4月12日（日）26:00～" },
  { channel: "群馬テレビ", schedule: "2020年4月6日（月）24:30～" },
  { channel: "とちぎテレビ", schedule: "2020年4月6日（月）24:30～" },
  { channel: "チバテレビ", schedule: "2020年4月8日（水）25:00～" },
  { channel: "サンテレビ", schedule: "2020年4月6日（月）25:30～" },
  { channel: "テレビ山口", schedule: "2020年4月10日（金）25:55～" },
  { channel: "テレビ長崎", schedule: "2020年5月7日（木）25:00～" },
  { channel: "BSフジ", schedule: "2020年4月7日（火）24:30～" },
  { channel: "AT-X", schedule: "2020年4月6日（月）22:30～" },
  { channel: "青森テレビ", schedule: "2020年7月6日（月）25:29～" },
];

export const onair2ndBroadcast = {
  title: "2期 テレビ放送情報！",
  rows: onair2ndBroadcastRows,
  note: "※放送日時は都合により変更になる場合がございます。",
};

export const onair1stStreamingLinks = [
  {
    name: "Amazon Prime Video",
    url: "https://www.amazon.co.jp/gp/video/detail/B07F94QL52/ref=cm_sw_tw_r_pv_wb_U9a4EhHd8yv1o",
  },
  {
    name: "dアニメストア",
    url: "https://anime.dmkt-sp.jp/animestore/ci_pc?workId=23200&ref=twtr",
  },
  { name: "U-NEXT/アニメ放題", url: "https://video.unext.jp/title/SID0045432" },
  {
    name: "AbemaTV",
    url: "https://abema.tv/channels/anime-live/slots/BzM18TKxoWHmuy",
  },
  { name: "バンダイチャンネル", url: "https://www.b-ch.com/titles/6810/" },
];

export const onair1stStreaming = {
  title: "1期 配信情報！",
  links: onair1stStreamingLinks,
  note: "様々な配信サービスで大好評配信中！",
};

export const onair1stRebroadcastRows = [
  {
    channel: "TOKYOMX",
    date: "2020年1月5日（日）から",
    schedule: "25:05〜",
  },
  {
    channel: "BSフジ",
    date: "2020年1月12日（日）から",
    schedule: "24:00〜",
  },
  {
    channel: "北海道文化放送",
    date: "2020年1月14日（火）から",
    schedule: "25:45〜",
  },
];

export const onair1stRebroadcast = {
  title: "1期 テレビ再放送情報！",
  rows: onair1stRebroadcastRows,
  note: "※放送日時は都合により変更になる場合がございます。<br />■BSフジ<br />1月12日（日）24:25～24:55<br />1月19日（日）24:50～25:20<br />1月26日（日）24:35～25:05<br />2月9日（日）25:30～26:00<br />■北海道文化放送<br />1月14日（火）27:10-27:40<br />2月4日（火）27:00～27:30",
};

export const onair1stBroadcastRows = [
  {
    channel: "TOKYOMX",
    date: "2018年7月9日（月）から",
    schedule: "25:05〜",
  },
  {
    channel: "チバテレビ",
    date: "2018年7月13日（金）から",
    schedule: "25:00〜",
  },
  {
    channel: "とちぎテレビ",
    date: "2018年7月11日（水）から",
    schedule: "24:00〜",
  },
  {
    channel: "三重テレビ",
    date: "2018年7月11日（水）から",
    schedule: "26:20〜",
  },
  {
    channel: "サンテレビ",
    date: "2018年7月9日（月）から",
    schedule: "25:30〜",
  },
  {
    channel: "西日本放送",
    date: "2018年7月15日（日）から",
    schedule: "26:00〜",
  },
  {
    channel: "BSフジ",
    date: "2018年7月9日（月）から",
    schedule: "24:00〜",
  },
  {
    channel: "北海道文化放送",
    date: "2018年7月15日（日）から",
    schedule: "25:45〜",
  },
  {
    channel: "びわ湖放送",
    date: "2018年7月10日（火）から",
    schedule: "26:45〜",
  },
  {
    channel: "AT-X",
    date: "2018年7月13日（金）から<br />※リピート放送 毎週（月）<br />毎週（水）",
    schedule: "21:30〜<br />13:30〜<br />29:30〜",
    isHtml: true,
  },
];

export const onair1stBroadcast = {
  title: "1期 テレビ放送情報！",
  rows: onair1stBroadcastRows,
};
