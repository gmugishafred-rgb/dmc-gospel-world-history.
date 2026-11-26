(() => {
const questions = [
["Genesis","Beginner","Who built an ark to survive the flood?",["Abraham","Noah","Moses","Joseph"],1,"Genesis 6:13–22","God instructed Noah to build an ark for his family and the animals."],
["Genesis","Beginner","What did God create on the first day?",["The sun and moon","Dry land","Light","Animals"],2,"Genesis 1:3–5","God said, “Let there be light,” and separated light from darkness."],
["Genesis","Intermediate","What was the name of Abraham's wife?",["Rebekah","Sarah","Rachel","Leah"],1,"Genesis 17:15; 21:1–3","Sarai's name was changed to Sarah, and she gave birth to Isaac."],
["Exodus","Beginner","Who led the Israelites out of Egypt?",["Aaron","Joshua","Moses","Caleb"],2,"Exodus 3:10; 12:31–42","God called Moses to lead Israel out of slavery in Egypt."],
["Exodus","Beginner","Where did Moses receive the Ten Commandments?",["Mount Carmel","Mount Sinai","Mount Zion","Mount of Olives"],1,"Exodus 19–20","God gave the commandments to Moses at Mount Sinai."],
["Joshua","Intermediate","What city did the Israelites march around before its walls fell?",["Jericho","Ai","Bethel","Hebron"],0,"Joshua 6:1–20","The walls of Jericho fell after Israel followed God's instructions."],
["Judges","Intermediate","Which judge was known for great strength?",["Gideon","Samson","Deborah","Ehud"],1,"Judges 13–16","Samson's strength was associated with his Nazirite calling and uncut hair."],
["Ruth","Beginner","Who was Ruth's mother-in-law?",["Hannah","Naomi","Miriam","Elizabeth"],1,"Ruth 1:3–5, 16","Ruth remained loyal to Naomi after the deaths of their husbands."],
["1 Samuel","Beginner","Who defeated Goliath?",["Saul","Jonathan","David","Samuel"],2,"1 Samuel 17:40–50","David defeated Goliath with a sling and a stone, trusting in the Lord."],
["1 Kings","Intermediate","Which prophet confronted the prophets of Baal on Mount Carmel?",["Elisha","Elijah","Isaiah","Nathan"],1,"1 Kings 18:17–40","Elijah challenged the prophets of Baal and called Israel back to the Lord."],
["Job","Advanced","What did Job say after losing his possessions and children?",["The Lord gave and the Lord has taken away","I will never worship again","My friends caused this","There is no hope"],0,"Job 1:20–22","Job worshiped and acknowledged the Lord even in deep loss."],
["Psalms","Beginner","According to Psalm 23, who is the shepherd?",["Moses","The Lord","David","An angel"],1,"Psalm 23:1","The psalm begins, “The LORD is my shepherd.”"],
["Proverbs","Beginner","What is the beginning of knowledge?",["Wealth","Power","The fear of the LORD","Fame"],2,"Proverbs 1:7","Proverbs teaches that the fear of the LORD is the beginning of knowledge."],
["Isaiah","Intermediate","Which prophet saw the Lord seated on a high and lofty throne?",["Jeremiah","Ezekiel","Isaiah","Daniel"],2,"Isaiah 6:1–8","Isaiah's vision includes the Lord on a throne and the seraphim calling “Holy, holy, holy.”"],
["Daniel","Beginner","Who was thrown into the lions' den?",["Shadrach","Daniel","Nehemiah","Ezra"],1,"Daniel 6:16–23","God sent his angel and shut the lions' mouths."],
["Jonah","Beginner","Which city was Jonah sent to warn?",["Babylon","Nineveh","Jerusalem","Tyre"],1,"Jonah 1:1–2; 3:1–5","God sent Jonah to Nineveh to announce a message of warning."],
["Micah","Advanced","Where did Micah prophesy the ruler of Israel would come from?",["Nazareth","Bethlehem Ephrathah","Jerusalem","Capernaum"],1,"Micah 5:2","Micah 5:2 names Bethlehem Ephrathah; Matthew 2:5–6 connects it with the Messiah."],
["Matthew","Beginner","Where was Jesus born?",["Nazareth","Bethlehem","Jericho","Cana"],1,"Matthew 2:1","Matthew records that Jesus was born in Bethlehem of Judea."],
["Matthew","Beginner","How many disciples did Jesus appoint as apostles?",["7","10","12","40"],2,"Matthew 10:1–4","Jesus called twelve disciples and gave them authority for ministry."],
["Mark","Intermediate","What did Jesus calm while he was in a boat with his disciples?",["An earthquake","A storm","A fire","A drought"],1,"Mark 4:35–41","Jesus rebuked the wind and told the sea to be still."],
["Luke","Beginner","Who was the angel that announced Jesus' birth to Mary?",["Michael","Gabriel","Raphael","Uriel"],1,"Luke 1:26–38","Gabriel was sent by God to Mary in Nazareth."],
["John","Beginner","According to John 3:16, what did God give because he loved the world?",["A kingdom","His only Son","A temple","A prophet"],1,"John 3:16","God gave his only Son so that whoever believes in him may have eternal life."],
["Acts","Intermediate","On which day did the Holy Spirit come upon the gathered disciples?",["Passover","Pentecost","The Sabbath","The Day of Atonement"],1,"Acts 2:1–4","The disciples were together when the Holy Spirit came at Pentecost."],
["Acts","Beginner","What was Paul's name before he became widely known as Paul?",["Simon","Saul","Silas","Stephen"],1,"Acts 7:58; 9:1–19; 13:9","Acts introduces him as Saul and later identifies him as Saul, also called Paul."],
["Romans","Intermediate","According to Romans 3:23, who has sinned?",["Only Israel","Only Gentiles","All have sinned","Only rulers"],2,"Romans 3:23","Paul writes that all have sinned and fall short of God's glory."],
["1 Corinthians","Intermediate","Which chapter is widely known for its teaching about love?",["1 Corinthians 7","1 Corinthians 10","1 Corinthians 13","1 Corinthians 16"],2,"1 Corinthians 13:1–13","Chapter 13 describes the character and enduring importance of love."],
["Ephesians","Beginner","What does Ephesians 6 describe?",["The fruit of the vine","The armor of God","The plagues of Egypt","The rebuilding of the temple"],1,"Ephesians 6:10–18","Paul describes the armor of God and calls believers to stand firm."],
["Philippians","Intermediate","Which verse says, “I can do all things through Christ who strengthens me”?",["Philippians 4:13","Romans 8:1","John 1:1","Galatians 5:22"],0,"Philippians 4:13","Paul says he has learned contentment in every circumstance through Christ's strength."],
["2 Timothy","Advanced","According to 2 Timothy 3:16, what is all Scripture useful for?",["Only singing","Teaching, reproof, correction and training in righteousness","Predicting dates","Building temples"],1,"2 Timothy 3:16–17","Paul says Scripture is God-breathed and equips the servant of God for every good work."],
["Hebrews","Intermediate","How does Hebrews 11:1 describe faith?",["The assurance of things hoped for","A kind of wealth","A human tradition","A political office"],0,"Hebrews 11:1","Hebrews describes faith as assurance of what is hoped for and conviction of what is not seen."],
["James","Beginner","According to James, faith without what is dead?",["Prayer","Works","Knowledge","Money"],1,"James 2:17","James teaches that genuine faith is demonstrated through action."],
["1 Peter","Advanced","What does 1 Peter call believers to be, because God is holy?",["Famous","Holy in all conduct","Rich","Fearless of everyone"],1,"1 Peter 1:15–16","Peter quotes the command to be holy because God is holy."],
["1 John","Beginner","According to 1 John 4:8, what is God?",["Light","Love","A consuming fire","A king only"],1,"1 John 4:8","John writes that the one who does not love does not know God, because God is love."],
["Revelation","Beginner","On which island was John when he received the Revelation?",["Crete","Cyprus","Patmos","Malta"],2,"Revelation 1:9","John says he was on the island called Patmos because of the word of God and testimony of Jesus."],
["Revelation","Intermediate","What is the final book of the Bible?",["Jude","Hebrews","Revelation","Acts"],2,"Revelation","Revelation is the final book in the Christian Bible."]
];
const root=document.getElementById("quizApp"); if(!root)return;
let pool=[],index=0,score=0,correct=0,answered=false;
const $=id=>document.getElementById(id),bestKey="dmcBibleQuizBest";
function shuffle(list){const a=list.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function startQuiz(){
 const level=$("quizLevel").value,book=$("quizBook").value;
 pool=shuffle(questions.filter(q=>(level==="All"||q[1]===level)&&(book==="All"||q[0]===book))).slice(0,10);
 index=0;score=0;correct=0;answered=false;
 $("quizSetup").classList.add("hidden");$("quizPlay").classList.remove("hidden");$("quizResult").classList.add("hidden");renderQuestion();
}
function renderQuestion(){
 const q=pool[index];answered=false;
 $("quizProgress").textContent="Question "+(index+1)+" of "+pool.length;
 $("quizProgressBar").style.width=(index/pool.length*100)+"%";
 $("quizScore").textContent=score;$("quizBookTag").textContent=q[0]+" • "+q[1];$("quizQuestion").textContent=q[2];
 $("quizChoices").innerHTML=q[3].map((a,i)=>'<button type="button" class="quiz-choice" data-choice="'+i+'"><span class="choice-letter">'+String.fromCharCode(65+i)+'</span><span>'+a+'</span></button>').join("");
 $("quizFeedback").className="quiz-feedback hidden";$("quizFeedback").textContent="";$("quizNext").classList.add("hidden");
 $("quizChoices").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>choose(Number(b.dataset.choice))));
}
function choose(n){
 if(answered)return;answered=true;const q=pool[index],ok=n===q[4];if(ok){score+=10;correct++}
 $("quizScore").textContent=score;
 $("quizChoices").querySelectorAll("button").forEach((b,i)=>{b.disabled=true;if(i===q[4])b.classList.add("is-correct");else if(i===n)b.classList.add("is-wrong")});
 const f=$("quizFeedback");f.classList.remove("hidden");f.classList.toggle("good",ok);f.classList.toggle("bad",!ok);
 f.innerHTML='<strong>'+(ok?'✓ Correct! +10 points':'✗ Not quite. +0 points')+'</strong><p>'+(ok?'Well done!':'Correct answer: <b>'+q[3][q[4]]+'</b>')+'</p><p>'+q[6]+'</p><small>Scripture: '+q[5]+'</small>';
 $("quizNext").textContent=index===pool.length-1?"See my results":"Next question →";$("quizNext").classList.remove("hidden");
}
function finish(){
 $("quizPlay").classList.add("hidden");$("quizResult").classList.remove("hidden");
 const percent=Math.round(correct/pool.length*100),best=Math.max(Number(localStorage.getItem(bestKey)||0),score);
 localStorage.setItem(bestKey,String(best));$("quizFinalScore").textContent=score+" / "+(pool.length*10);
 $("quizFinalSummary").textContent="You answered "+correct+" out of "+pool.length+" questions correctly ("+percent+"%).";
 $("quizBest").textContent=best+" points";
 $("quizMessage").textContent=percent>=90?"Excellent Bible knowledge! Keep studying the Word.":percent>=70?"Very good work! Keep growing in Scripture.":percent>=50?"Good effort. Review the references and try again.":"Keep learning. Every Scripture you study helps you grow.";
}
$("quizStart").addEventListener("click",startQuiz);
$("quizNext").addEventListener("click",()=>{if(index<pool.length-1){index++;renderQuestion()}else finish()});
$("quizRestart").addEventListener("click",()=>{$("quizResult").classList.add("hidden");$("quizSetup").classList.remove("hidden")});
$("quizHome").addEventListener("click",()=>{if(typeof showTab==="function")showTab("home")});
$("quizBestDisplay").textContent=Number(localStorage.getItem(bestKey)||0)+" pts";
$("quizTotalQuestions").textContent=questions.length+" questions • Genesis to Revelation";
})();