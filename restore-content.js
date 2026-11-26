/* DMC content recovery: restores the Gospel, Seven Wonders and author's book catalogue
   independently of the main renderer, so these sections remain visible if another
   optional module fails. */
(function () {
  "use strict";
  const byId = id => document.getElementById(id);
  const escapeHTML = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[c]);
  const card = (title, body, refs, tag) =>
    '<article class="card"><span class="tag">'+escapeHTML(tag || "Gospel study")+
    '</span><h3>'+escapeHTML(title)+'</h3><p>'+escapeHTML(body)+'</p>'+
    '<p class="muted"><b>Bible references:</b> '+escapeHTML(refs)+'</p></article>';

  const gospelStudies = [
    ["The Gospel: God's good news","The Gospel is the good news that God acts to save through Jesus Christ: his life, death for sins, resurrection and lordship. It calls people to repentance, faith and a new life.","Mark 1:14–15; 1 Corinthians 15:1–8; Romans 1:16–17"],
    ["Creation, humanity and the image of God","The Bible begins with God as Creator. Human beings are made in God's image and entrusted with responsibility for creation.","Genesis 1:1–31; Genesis 2:7–25; Psalm 8"],
    ["The fall and the entrance of sin","Genesis describes human disobedience and its consequences: alienation from God, one another and the created order. The Bible also begins to point toward God's victory over evil.","Genesis 3; Romans 5:12–21"],
    ["God's covenant with Abraham","God called Abraham and promised blessing for all families of the earth. The New Testament connects this promise with the blessing given through Christ.","Genesis 12:1–3; 15:1–6; Galatians 3:6–14"],
    ["Moses, the Exodus and Passover","God delivered Israel from slavery in Egypt. Passover became a lasting remembrance of deliverance and is used in the New Testament to explain Christ's saving work.","Exodus 3; 12–14; 1 Corinthians 5:7"],
    ["The Law, worship and holiness","The Law taught Israel about covenant life, justice, worship and holiness. Christians read it in the light of Jesus, who fulfils the Law and the Prophets.","Exodus 20; Leviticus 19:1–18; Matthew 5:17–20"],
    ["The kingship of David and the promise","God's covenant with David shaped Israel's hope for a lasting kingdom. The New Testament presents Jesus as the promised Son of David and Messiah.","2 Samuel 7:8–16; Psalm 89; Luke 1:32–33"],
    ["The prophets and the hope of restoration","Israel's prophets called people back to covenant faithfulness, condemned injustice and announced God's future restoration and salvation.","Isaiah 9:1–7; 40:1–11; Jeremiah 31:31–34; Micah 5:2"],
    ["The birth and identity of Jesus","The four Gospels present Jesus as Messiah and Son of God. His birth is set within Israel's story and the promises of Scripture.","Matthew 1–2; Luke 1–2; John 1:1–18"],
    ["The Kingdom of God and the teaching of Jesus","Jesus announced God's Kingdom through teaching, parables, healing and acts of mercy. He called people to repent, trust God and love their neighbours.","Matthew 5–7; Mark 1:14–20; Luke 4:16–21"],
    ["The cross and atonement","The New Testament explains Jesus' death as central to God's saving purpose, bringing forgiveness and reconciliation. Christian traditions explain aspects of atonement in different ways.","Mark 10:45; Romans 3:21–26; 1 Peter 2:22–25"],
    ["The resurrection and ascension","The apostles proclaimed that God raised Jesus from the dead. The resurrection is foundational to Christian hope and the proclamation of the Gospel.","Luke 24; Acts 1:1–11; 1 Corinthians 15"],
    ["Pentecost and the birth of the Church","At Pentecost the Holy Spirit empowered the disciples to witness. The early church grew through teaching, fellowship, prayer, service and mission.","Acts 2:1–47; Acts 4:32–35"],
    ["Paul and the mission to the nations","Paul carried the Gospel across the eastern Mediterranean, planted and strengthened churches, and wrote letters teaching believers about life in Christ.","Acts 9; 13–28; Romans 1:1–17"],
    ["Salvation by grace through faith","The New Testament teaches that salvation is God's gift, received through faith, and that believers are created in Christ for good works.","John 3:16–18; Ephesians 2:1–10; Titus 3:3–8"],
    ["Discipleship, prayer and Christian character","Following Jesus includes learning his teaching, prayer, forgiveness, service, love and the fruit of the Spirit in daily life.","Matthew 28:18–20; John 15:1–17; Galatians 5:16–26"],
    ["The return of Christ and the new creation","The New Testament encourages watchfulness and hope in Christ's return, final justice and God's renewal of creation. Interpretations of the details differ among Christians.","Matthew 24:1–44; 1 Thessalonians 4:13–18; Revelation 21–22"]
  ];

  const books = [
    {title:"Sin",description:"A study of what sin is, why sin exists, the history of sin, and how to overcome sin and live a holy life in Christ Jesus."},
    {title:"Love",description:"A Christian study of love, its biblical meaning and expressions, and the call to love God and neighbour."},
    {title:"The Calling of God",description:"A Christian work about God's calling, hearing and obeying his Word, and living as a disciple."},
    {title:"Healing Sudan",description:"A study project about Sudan's land, history, resources, conflict, suffering and possibilities for peace and national healing."}
  ];

  function renderBooks() {
    const target = byId("myBookCards");
    if (!target) return;
    target.innerHTML = books.map(b =>
      '<article class="card"><span class="tag">By Mugisha Fred Elisha</span><h3>'+escapeHTML(b.title)+'</h3>'+
      '<p>'+escapeHTML(b.description)+'</p><p class="muted">The book title and description are restored. The original PDF manuscript is not stored in this repository yet, so a download cannot be offered until that file is added.</p></article>'
    ).join("");
  }

  function renderGospel() {
    const target = byId("gospelCards");
    if (!target) return;
    target.innerHTML = gospelStudies.map(s => card(s[0],s[1],s[2],"Gospel study")).join("");
  }

  function renderWonders() {
    const target = byId("wonderCards");
    if (!target) return;
    const fallback = [
      ["Great Pyramid of Giza","Giza, Egypt","The only surviving wonder; built as the tomb of Pharaoh Khufu.",29.9792,31.1342],
      ["Hanging Gardens of Babylon","Babylon, Iraq","Described by ancient writers; their existence and exact location remain debated.",32.5364,44.42],
      ["Statue of Zeus at Olympia","Olympia, Greece","A monumental statue by Phidias, housed in the Temple of Zeus.",37.6386,21.63],
      ["Temple of Artemis","Ephesus, Türkiye","A celebrated sanctuary dedicated to Artemis, rebuilt several times.",37.9497,27.3639],
      ["Mausoleum at Halicarnassus","Bodrum, Türkiye","A monumental tomb built for Mausolus; the word mausoleum comes from his name.",37.0379,27.4241],
      ["Colossus of Rhodes","Rhodes, Greece","A giant bronze statue of Helios, remembered in ancient accounts.",36.451,28.227],
      ["Lighthouse of Alexandria","Alexandria, Egypt","A famous lighthouse on Pharos island that guided ships into Alexandria's harbour.",31.2135,29.8853]
    ];
    let source = fallback;
    try { if (typeof wonders !== "undefined" && Array.isArray(wonders) && wonders.length === 7) source = wonders; } catch (_) {}
    target.innerHTML = source.map((w,i) => {
      const name=w[0],place=w[1],description=w[2],lat=w[3],lon=w[4],img=w[5]||"";
      const image=img ? '<img src="'+escapeHTML(img)+'" alt="'+escapeHTML(name)+'" loading="lazy" referrerpolicy="no-referrer" style="display:block;width:100%;height:190px;object-fit:cover;background:#eee" onerror="this.style.display=\'none\'">' :
        '<div style="height:90px;display:grid;place-items:center;background:#f1e8d2;color:#624916;font-weight:700">Ancient Wonder '+(i+1)+'</div>';
      const mapButton = '<button class="btn" type="button" data-wonder-lat="'+lat+'" data-wonder-lon="'+lon+'">Show on map</button>';
      return '<article class="card wonder-card" style="padding:0;overflow:hidden">'+image+
        '<div class="wonder-copy" style="padding:15px"><span class="tag">Ancient Wonder '+(i+1)+'</span><h3>'+escapeHTML(name)+'</h3>'+
        '<p class="muted">'+escapeHTML(place)+'</p><p>'+escapeHTML(description)+'</p>'+mapButton+'</div></article>';
    }).join("");
    target.querySelectorAll("[data-wonder-lat]").forEach(button => button.addEventListener("click", () => {
      const lat=Number(button.dataset.wonderLat),lon=Number(button.dataset.wonderLon);
      if (typeof window.focusPlace === "function") window.focusPlace(lat,lon);
      else { const maps=byId("maps"); if(maps){document.querySelectorAll(".section").forEach(s=>s.classList.toggle("active",s.id==="maps"));} }
    }));
  }

  function restore() { renderBooks(); renderGospel(); renderWonders(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",restore);
  else restore();
})();
