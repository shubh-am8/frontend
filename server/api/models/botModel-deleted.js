// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertChatBot = async (botData) => {
  try {
    botData.template_id = knexSqlDb.raw(`uuid_to_bin('${botData.template_id}')`)
    botData.created_by = knexSqlDb.raw(`uuid_to_bin('${botData.created_by}')`)
    await knexSqlDb.into('chat_builder')
      .insert(botData)
      .then(async function () {
      });
    return (true);
  } catch (error) {
    throw (error);
  }
};
// const insertResponse = async (responseData) => {
//   try {
//     await knexSqlDb.raw('TRUNCATE TABLE response');
//     await knexSqlDb.into('response')
//       .insert(responseData)
//       .then(async function () {
//       });
//     return (true);
//   } catch (error) {
//     throw (error);
//   }
// };





const updateBot = async (botData) => {
  try {
    const { chat_builder_id } = botData;
    let updatedBotData = null;
    if (Object.keys(botData).length > 0) {
      await knexSqlDb.from('chat_builder')
        .where({ chat_builder_id: chat_builder_id })
        .update(botData)
        .then(async function (isUpdated) {
          updatedBotData = await getBot({ chat_builder_id: chat_builder_id })
        });
    }
    return (updatedBotData);
  } catch (error) {
    throw (error);
  }
}
const deleteBot = async (templateId) => {
  try {
    // Old Code Start 
   
    // await knex('chat_builder')
    // .del().where('template_id', '=', templateId);
    // await knex('chat_flow')
    // .del().where('template_id', '=', templateId);
    // await knex('response_choice')
    // .del().where('template_id', '=', templateId);
     
    // Old Code End 

    // updated by datta start 
    // updated by datta start 

    await knex('chat_builder')
    .del().where('template_id', '=', knexSqlDb.raw(`uuid_to_bin('${templateId}')`));
    await knex('chat_flow')
    .del().where('template_id', '=', knexSqlDb.raw(`uuid_to_bin('${templateId}')`));
    await knex('response_choice')
    .del().where('template_id', '=', knexSqlDb.raw(`uuid_to_bin('${templateId}')`));
    
    // updated by datta End 
    return true;
  } catch (error) {
    throw (error);
  }
}
const getBot = async (data) => {
  try {
    const { template_id } = data;
    let botData = null;
    let botFinalData
    botData = await knexSqlDb.from('chat_builder')
      .select([
        '*',
        knexSqlDb.raw(`bin_to_uuid(template_id) as template_id`),
        knexSqlDb.raw(`bin_to_uuid(created_by) as created_by`)
      ])
      .where(qb => {
          qb.where('chat_builder.template_id',knexSqlDb.raw(`uuid_to_bin('${template_id}')`))
      })
    botFinalData = botData.length?botData[0]:botData;
    if(botFinalData.builder_json){
      botFinalData.builder_json =  JSON.parse(botFinalData.builder_json)
    }
    return (botFinalData);
  } catch (error) {
    throw (error);
  }
}
// const getInfluencers = async (request) => {
//   try {
//     const { page_number, page_size, influencer_id, profession_id, user_id } = request;
//     const pagination = new Object();
//     const limitPerPage = page_size || Number.MAX_SAFE_INTEGER;
//     const page = Math.max(page_number || 1, 1);
//     const offset = (page - 1) * limitPerPage;
//     return Promise.all([
//       await knexSqlDb('users as us')
//         .select([
//           'us.user_id',
//           'us.user_fname',
//           'us.user_lname',
//           'us.user_dob',
//           'us.user_email',
//           'us.role',
//           'us.heighest_study_level',
//           'us.fos_id',
//           'us.profession_id',
//           'us.user_pref1',
//           'us.user_pref2',
//           'us.user_pref3',
//           'us.user_profile_image',
//           'us.user_text_bio',
//           'us.user_video_bio',
//           'us.user_website',
//           'us.user_linkedin',
//           'us.facebook_id',
//           'us.facebook_token',
//           'us.google_id',
//           'us.google_token',
//           'us.user_type',
//           'us.user_status',
//           'us.email_verified',
//           'us.email_verification_token',
//           'us.password_reset_token',
//           'us.otp',
//           'us.influencer_session_price',
//           'p.*',
//           'fos.*',
//           knexSqlDb.raw('bin_to_uuid(us.user_id) as user_id'),
//           knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers followers WHERE followers.user_id = us.user_id ) as followers_count`),
//           knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers following WHERE following.follower_id= us.user_id ) as following_count`)
//         ])
//         .select(knexSqlDb.raw('count(*) OVER() as total'))
//         .leftJoin('professions as p', 'p.profession_id', '=', 'us.profession_id')
//         .leftJoin('field_of_study_master as fos', 'fos.fos_id', '=', 'us.fos_id')
//         .where({ role: 'Influencer', user_status: 'Active' })
//         .where(qb => {
//           if (influencer_id) {
//             qb.andWhere('us.user_id', '=', knexSqlDb.raw(`uuid_to_bin('${influencer_id}')`))
//           } else if (profession_id) {
//             qb.andWhere('us.profession_id', '=', profession_id)
//           }
//         })
//         .orderBy('us.user_fname', 'desc')
//         .limit(limitPerPage)
//         .offset(offset)
//     ]).then(async ([influencerList]) => {
//       let total = 0
//       if (influencerList.length) {
//         total = influencerList[0].total;
//       }
//       const count = total;
//       pagination.total = parseInt(count, 10);
//       pagination.page_size = page_size;
//       pagination.offset = offset;
//       pagination.to = offset + influencerList.length;
//       pagination.last_page = Math.ceil(count / page_size);
//       pagination.page_number = page;
//       pagination.from = offset;
//       influencerList = await commonHelper.beautifyData(influencerList);
//       pagination.data = influencerList;

//       return pagination.data;
//     });
//   } catch (error) {
//     throw (error);
//   }
// }
// const isEmailExists = async (email) => {
//   try {
//     let data = await knexSqlDb.from('users')
//       .select([knexSqlDb.raw('bin_to_uuid(user_id) as user_id')])
//       .where({ user_email: email })
//     if (data.length) {
//       return (true);
//     } else {
//       return (false);
//     }
//   } catch (error) {
//     throw (error);
//   }
// }
// const searchInfluencer = async (search) => {
//   try {
//     let influencersData = await knexSqlDb
//       .from('users as us')
//       .select([
//         'us.user_id',
//         'us.user_fname',
//         'us.user_lname',
//         'us.user_dob',
//         'us.user_email',
//         'us.role',
//         'us.heighest_study_level',
//         'us.fos_id',
//         'us.profession_id',
//         'us.user_pref1',
//         'us.user_pref2',
//         'us.user_pref3',
//         'us.user_profile_image',
//         'us.user_text_bio',
//         'us.user_video_bio',
//         'us.user_website',
//         'us.user_linkedin',
//         'us.facebook_id',
//         'us.facebook_token',
//         'us.google_id',
//         'us.google_token',
//         'us.user_type',
//         'us.user_status',
//         'us.email_verified',
//         'us.email_verification_token',
//         'us.password_reset_token',
//         'us.otp',
//         'us.influencer_session_price',
//         knexSqlDb.raw('bin_to_uuid(user_id) as user_id'),
//         'p.*'
//       ])
//       .leftJoin('professions as p', 'p.profession_id', '=', 'us.profession_id')
//       .where({ role: 'Influencer' })
//       .where(qb => {
//         qb.where('user_fname', 'like', `%${search}%`)
//           .orWhere('user_lname', 'like', `%${search}%`);
//       })
//     influencersData = await commonHelper.beautifyData(influencersData);
//     return (influencersData);
//   } catch (error) {
//     throw (error);
//   }
// }
// const getInfluencersByTopicId = async (request) => {
//   try {
//     const { page_number, page_size, topic_id, sub_topic_id } = request;
//     const pagination = new Object();
//     const limitPerPage = page_size || Number.MAX_SAFE_INTEGER;
//     const page = Math.max(page_number || 1, 1);
//     const offset = (page - 1) * page_size;
//     let courses = new Object();
//     let finalUsers = new Array;
//     let influencersData = await knexSqlDb
//       .from('users as u')
//       .select([
//         'u.user_id',
//         'u.user_fname',
//         'u.user_lname',
//         'u.user_dob',
//         'u.user_email',
//         'u.role',
//         'u.heighest_study_level',
//         'u.fos_id',
//         'u.profession_id',
//         'u.user_pref1',
//         'u.user_pref2',
//         'u.user_pref3',
//         'u.user_profile_image',
//         'u.user_text_bio',
//         'u.user_video_bio',
//         'u.user_website',
//         'u.user_linkedin',
//         'u.facebook_id',
//         'u.facebook_token',
//         'u.google_id',
//         'u.google_token',
//         'u.user_type',
//         'u.email_verified',
//         'u.email_verification_token',
//         'u.password_reset_token',
//         'u.otp',
//         'u.influencer_session_price',
//         'u.user_status',
//         'p.*',
//         knexSqlDb.raw('bin_to_uuid(user_id) as user_id'),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers followers WHERE followers.user_id = u.user_id ) as followers_count`),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers following WHERE following.follower_id = u.user_id ) as following_count`)
//       ])
//       .select(knexSqlDb.raw('count(*) OVER() as total'))
//       .leftJoin('professions as p', 'p.profession_id', '=', 'u.profession_id')
//       .innerJoin('courses', 'courses.author_id', '=', 'u.user_id')
//       .distinct()
//       .where({ role: 'Influencer', user_status: 'Active' })
//       .where(qb => {
//         if (topic_id) {
//           qb.where('courses.topic_id', '=', topic_id)
//         }
//         if (sub_topic_id) {
//           qb.orWhere('courses.sub_topic_id', '=', sub_topic_id);
//         }
//       })
//       .orderBy('user_fname', 'desc')
//       .limit(limitPerPage)
//       .offset(offset)
//     let total = 0
//     if (influencersData.length) {
//       total = influencersData[0].total;
//     }
//     const count = total;
//     pagination.total = parseInt(count, 10);
//     pagination.page_size = page_size;
//     pagination.offset = offset;
//     pagination.to = offset + influencersData.length;
//     pagination.last_page = Math.ceil(count / page_size);
//     pagination.page_number = page;
//     pagination.from = offset;
//     influencersData = await commonHelper.beautifyData(influencersData);
//     await influencersData.reduce(async (promise, influencer, index) => {
//       let authorId = influencer.user_id;
//     //   courses = await coursesModel.getCourses({ author_id: authorId, topic_id: topic_id, sub_topic_id: sub_topic_id });
//       influencer.courses = courses;
//       finalUsers.push(influencer);
//       await promise;
//       pagination.data = finalUsers;
//     }, Promise.resolve());
//     return pagination.data;
//   } catch (error) {
//     throw (error);
//   }
// };
// const getUserProfile = async (request) => {
//   try {
//     const { user_id, current_date } = request;
//     let userData = await knexSqlDb.from('users as u')
//       .select([
//         'u.user_id',
//         'u.user_fname',
//         'u.user_lname',
//         'u.user_dob',
//         'u.user_email',
//         'u.role',
//         'u.heighest_study_level',
//         'u.fos_id',
//         'u.profession_id',
//         'u.user_pref1',
//         'u.user_pref2',
//         'u.user_pref3',
//         'u.user_profile_image',
//         'u.user_text_bio',
//         'u.user_video_bio',
//         'u.user_website',
//         'u.user_linkedin',
//         'u.facebook_id',
//         'u.facebook_token',
//         'u.google_id',
//         'u.google_token',
//         'u.user_type',
//         'u.email_verified',
//         'u.email_verification_token',
//         'u.password_reset_token',
//         'u.otp',
//         'u.influencer_session_price',
//         'u.user_status', 'p.*',
//         knexSqlDb.raw('bin_to_uuid(user_id) as user_id'),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers followers WHERE followers.user_id = u.user_id ) as followers_count`),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM user_followers following WHERE following.follower_id = u.user_id ) as following_count`),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM topic_followers tf WHERE tf.follower_id = u.user_id ) as topic_followed_count`),
//         knexSqlDb.raw(`(SELECT COUNT(*) FROM user_bookings ub WHERE ub.booked_for = u.user_id and booking_status = 'Confirmed' and payment_status = 'Paid' and date_of_booking >= ? ) as upcoming_sessions_count`, [current_date])
//       ])
//       .where({ user_id: knexSqlDb.raw(`uuid_to_bin('${user_id}')`) })
//       .leftJoin('professions as p', 'p.profession_id', '=', 'u.profession_id')
//     userData = await commonHelper.beautifyData(userData);
//     return (userData[0]);
//   } catch (error) {
//     throw (error);
//   }
// }
module.exports = {
    insertChatBot,
    getBot,
    updateBot,
    deleteBot
//   updateUser,
//   getUser,
//   getInfluencers,
//   isEmailExists,
//   searchInfluencer,
//   getInfluencersByTopicId,
//   getUserProfile
}