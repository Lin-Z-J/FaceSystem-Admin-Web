const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
};

export default [
  {
    url: '/publicKey',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      };
    },
  },
  {
    // url: '/api/login',
    url: '/loRe/login',
    method: 'post',
    response: (config) => {
      // const { username } = config.body;
      const username  = 'admin';
      const token = accessTokens[username];
      if (!token) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        };
      }
      return {
        code: 200,
        msg: 'success',
        data: { token },
      };
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
      };
    },
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  
  {
    url: '/user/searchOneUser',
    type: 'get',
    response(){
    // response(config) {
      // const { token } = config.body;
      // let permissions = ['admin'];
      let power = 'admin';
      let username = '潘康华';
      let faceUrl='http://localhost:8089/src/assets/avatar.jpg';
      // if ('admin-accessToken' === token) {
      //   permissions = ['admin'];
      //   username = 'admin';
      // }
      // if ('editor-accessToken' === token) {
      //   permissions = ['editor'];
      //   username = 'editor';
      // }
      // if ('test-accessToken' === token) {
      //   permissions = ['admin', 'editor'];
      //   username = 'test';
      // }
      return {
        code: 200,
        msg: 'success',
        data: {
          power,
          username,
          faceUrl
        },
      };
    },
  },

  {
    url: '/updateUserPwd',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  
  {
    url: '/updateUserProfile',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  
  {
    url: '/uploadAvatar',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  
  
  
  
  // 增删改查
  

  
  
];
