module.exports = value => {
  let giveScore = [];
  value.forEach(student_subject => {
    if(student_subject.score > 85 && student_subject.score <= 100) {giveScore.push('A');}
    if(student_subject.score > 70 && student_subject.score <=85) {giveScore.push('B');}
    if(student_subject.score > 55 && student_subject.score <= 70) {giveScore.push('C');}
    if(student_subject.score <= 55 && student_subject.score > 0) {giveScore.push('C');}
    if(student_subject.score === null) {giveScore.push('-')}
  })
  return giveScore;
}


// let giveScore = (score) => {
//     if(score > 85 && score <=100){
//       return 'A'
//     }else if(score > 70 && score <= 85){
//       return 'B'
//     }else if(score > 55 && score <= 70){
//       return 'C'
//     }else if(score <= 55 && score > 0){
//       return 'E'
//     }else if(score == null){
//       return 'empty'
//     }
//   }
// 
// module.exports = giveScore()
