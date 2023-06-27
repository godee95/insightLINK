import '../dotenv.js';
import { db } from '../connect.js';
import { recomUserQuery } from '../db/socialQueries.js';
import { tagQuery } from '../db/socialQueries.js';
import { profileQuery } from '../db/socialQueries.js';
import { followCheckQuery } from '../db/followQueries.js';

import { logger } from '../winston/logger.js';


/* recomUserQuery(userId, limit) 함수로 분리*/
export const recomUsersFunc = async (req, res, next) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    const [recommendList] = await connection.query(recomUserQuery(userId, 10));
    req.recommendList = recommendList;  // attach to req
    connection.release();
    next(); // move on to next middleware
  } catch (err) {
    connection?.release();
    logger.error('/routes/social/recomUser 폴더, get, err : ', err);
    res.status(500).send('Internal Server Error');
  }
};


/* 전역변수로 값 저장해서 불러오는 방법
- 같은 파일에(recommend.js) recomUser, recomCards를 둔다.
- recomUserFunc의 실행 값 (limit은 10으로)
- 값으로 가져와서 
  1) recomUsers의 인자, (여기선 상위 5개만.)
  2) recommendSimilarQuery의 인자로 넣자. 
*/
// const recommendList = 

export const recomUsers = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;

  const recommendList = await req.recommendList;

  let connection = null;
  try {
    connection = await db.getConnection();
    
    /* 최종 리턴 */
    let data =[];

    /* 한 유저당 */
    for (const user of recommendList) {
      const recomUser = user.user_id;
      /* tag */
      let tags = [];
      const [tagList] = await connection.query(tagQuery, recomUser);
      for (const item of tagList) {
        tags.push(item.tag);
      }

      /* user profile - name, img */
      const [profile] = await connection.query(profileQuery, recomUser);
      const [checkFollow] = await connection.query(followCheckQuery, [userId, recomUser]);
      const isFriend = checkFollow[0].count > 0 ? true : false;

      const userProfile = {
        userId: recomUser,
        img: profile[0].profile_img,
        userName: profile[0].user_name,
        tags: tags,
        isFriend: isFriend,
      };

      data.push(userProfile);
    }

    connection.release();
    logger.info('/routes/social/recomUser 폴더, get 성공 !');
    res.status(200).send(data);  
  } catch (err) {
    connection?.release();
    logger.error('/routes/social/recomUser 폴더, get, err : ', err);
    res.status(500).send('Internal Server Error');
  }
};