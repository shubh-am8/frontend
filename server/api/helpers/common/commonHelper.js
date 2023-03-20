const moment = require('moment');
// const { currencyInfo } = require(_pathConst.filesPath.configUrl);



exports.getUniqueKeys = (array, keyName) => {
    var flags = [], output = [], l = array.length, i;
    for (i = 0; i < l; i++) {
        if (flags[array[i][keyName]]) continue;
        flags[array[i][keyName]] = true;
        output.push(array[i][keyName]);
    }
    return output;
}
/*
Capitalize first letter 
and remove white space from 
both side of string.
*/
exports.capFirstLetterrOfStr = (str) => {
    try {
        //this regex only allow a-z,A-Z,0-9 only in string
        let replacedStr = str.replace(/[^\w\s]/g, '');
        let outputStr = replacedStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
        return outputStr.trim();
    } catch (error) {
        throw error;
    }
}
const formatDuration = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds - hours * 3600 - minutes * 60
    // moment.unix(data['content_length']).utc().format('H [hrs] m [mins and] s [sec]');
    return [`${hours} hrs`, `${minutes} mins`, `${seconds} sec`]
        .filter(item => item[0] !== '0')
        .join(' ')
}
/*
   This Function genertae a random number, 
   by giving the required length as param.
 */
   exports.generateOTP = function (otpLength) {
    let baseNumber = Math.pow(10, otpLength - 1);
    let otp = Math.floor(Math.random() * baseNumber);
    /*
    Check if otp have 0 as first digit
    */
    if (otp < baseNumber) {
      otp += baseNumber;
    }
    return otp.toString();
  };
/*
this function is commonly used to beatutify 
the data like date formats/time format etc
*/
// exports.beautifyData = async (dataList) => {
//     try {
//         // if (dataList.length) {
//         dataList.map(data => {
//             if (data['start_time']) {
//                 data['start_time'] = moment(data['start_time'], "HH:mm").format("hh:mm A");
//             }
//             if (data['end_time']) {
//                 data['end_time'] = moment(data['end_time'], "HH:mm").format("hh:mm A");
//             }
//             if (data['content_length'] || data['content_length'] === null || data['content_length'] === "") {
//                 if (data['is_quiz'] && data['is_quiz'] === 1) {
//                     data.object_type = 'Quiz'
//                     data['quiz_time'] = formatDuration(data['quiz_time']);
//                 } else {
//                     data['content_length'] = formatDuration(data['content_length']);
//                     data.object_type = 'Content';
//                 }
//                 if (data['created_at']) {
//                     let created_at = data['created_at'].toString().split(" ");
//                     data['created_at'] = created_at[2] + " " + created_at[1] + " " + created_at[3];
//                 }
//             }
//             if (data['course_length'] || data['course_length'] === null || data['course_length'] === "") {
//                 data['course_length'] = formatDuration(data['course_length']);
//                 data.object_type = 'Course';
//             }
//             if (data['user_dob']) {
//                 data['user_dob'] = moment(data['user_dob']).format("DD-MM-YYYY");
//             }
//             if (data['total']) {
//                 // used in pagination
//                 delete data['total'];
//             }
//             if (data['avg_rating']) {
//                 data['avg_rating'] = parseFloat(data['avg_rating'].toFixed(1));
//             }
//             if (data['avg_rating'] === null) {
//                 data['avg_rating'] = 0;
//             }
//             if (data['course_price']) {
//                 data['course_price'] = parseInt(data['course_price']);
//                 data['course_display_price'] = currencyInfo.currencySign + ' ' + data['course_price'];
//                 data['currency_sign'] = currencyInfo.currencySign;
//             }
//             if (data['payment_status'] === 'Unpaid' && !data['is_sample']) {
//                 data['content_file_path'] = null;
//             }
//         })
//         // }
//         return dataList;
//     } catch (error) {
//         throw error;
//     }
// };

