import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '@/router'
import { applyToken } from '@/service/AuthenticatedUser.js'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
const apiURL = 'https://webchat-8f142.web.app/'

// Should you reload the page after logging in
applyToken(cookies.get('LegitUser')?.token)
export default createStore({
  state: {
    users: null,
    user: null,
    posts: null,
    post: null,
    messages: null,
    message: null,
    notifications: null,
    recentNotifications: null,
    notification: null,
    comments: null,
    comment: null


  },
  getters: {
    user: (state) => state.user,

  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, value) {
      state.user = value
    },
    setPosts(state, value) {
      state.posts = value
    },
    setPost(state, value) {
      state.post = value
    },
    addPost(state, value){
      state.post = value
    },
    setMessages(state, value) {
      state.messages = value
  },
    setMessage(state, value) {
    state.message = value
    },
    setNotifications(state, value) {
      state.notifications = value
      },
      setRecentNotifications(state, value){
        state.recentNotifications = value
      },
    setNotification(state, value){
      state.notification = value
    },
    setComments(state, value){
      state.comments = value
      },
      setComment(state, value){
        state.comment = value
        }
      

},
actions: {
      // ==== User ========
      async fetchUsers(context) {
        try {
          const { results, msg } = await (await axios.get(`${apiURL}Users`)).data
          if (results) {
            context.commit('setUsers', results)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async fetchUser(context, id) {
        try {
          const { result, msg } = await (await axios.get(`${apiURL}user/${id}`)).data
          if (result) {            
            context.commit('setUser', result)
          } else {
            toast.error(`${msg}+ here`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      
      async register(context, payload) {
        try {
          const { msg, err, token } = await (await axios.post(`${apiURL}user/register`, payload)).data
          if (token) {
            context.dispatch('fetchUsers')
            toast.success(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
            router.push({ name: 'login' })
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },      
      async updateUser(context, payload) {
        try {
          const { msg, err } = await (await axios.patch(`${apiURL}user/${payload.userID}`, payload)).data
          if (msg) {
            context.dispatch('fetchUsers')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      async deleteUser(context, id) {
        try {
          const { msg, err } = await (await axios.delete(`${apiURL}user/${id}`)).data
          if (msg) {
            context.dispatch('fetchUsers')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      // ==== Posts ========
      async fetchPosts(context) {
        try {
          const { results, msg } = await (await axios.get(`${apiURL}Posts`)).data
          if (results) {
            context.commit('setPosts', results)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async fetchPost(context, id) {
        try {
          const { result, msg } = await (await axios.get(`${apiURL}Posts/${id}`)).data
          if (result) {
            context.commit('setPost', result)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      async addPost (context, payload) {
        try { 
          const {data, msg} = await axios.post(`${apiURL}Posts${payload.postID}`,  payload)
          if (data) {
            context.commit('addPost', data)
            toast.success(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          } else{
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        }catch(e){
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      async updatePost(context, payload) {
        try {
          const { msg, err } = await (await axios.patch(`${apiURL}post/${payload.postID}`, payload)).data
          if (msg) {
            context.dispatch('fetchPosts')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async deletePost(context, id) {
        try {
          const { msg, err } = await (await axios.delete(`${apiURL}Post/${id}`)).data
          if (msg) {
            context.dispatch('fetchPosts')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      // Messages
      async fetchMessages(context) {
        try {
          const { results, msg } = await (await axios.get(`${apiURL}Message`)).data
          if (results) {
            context.commit('setMessages', results)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async fetchMessage(context, id) {
        try {
          const { result, msg } = await (await axios.get(`${apiURL}Message/${id}`)).data
          if (result) {
            context.commit('setMessage', result)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async sendMessage(context, payload){
        try {
          const { result, msg } = await (await axios.post(`${apiURL}Message`, payload)).data
            if (result) {
              context.commit('setMessage', result)
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER
                })
              } else {
                toast.error(`${msg}`,{
                  autoClose: 2000,
                  position: toast.POSITION.BOTTOM_CENTER
                })
              }

      }catch(e){
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },

      async deleteMessage(context, id) {
        try {
          const { msg, err } = await (await axios.delete(`${apiURL}Message/${id}`)).data
          if (msg) {
            context.dispatch('fetchMessage')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },


      // ===== LOGIN =======
      async login(context, payload) {
        try {
          const { msg, err, result, token } = await (await axios.post(`${apiURL}Users/login`, payload)).data;
          console.log(token);
          console.log(result);
          
          if (result) {
            // User successfully logged in
            toast.success(`${msg}😎`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            });
            context.commit('setUser',result);
            cookies.set('LegitUser', { token, msg, result });
            applyToken(token);
            router.push({ name: 'userProfile' });
          } else {
            // Handle case where the user is not registered (no result or invalid login)
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            });
            router.push({ name: 'register' });
          }
        } catch (e) {
          if (e.response && e.response.status === 401) {
            // Unregistered user or wrong credentials
            toast.error(`Invalid credentials. Please sign up.`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            });
            router.push({ name: 'register' });
          } else {
            // Other errors
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        }
      },

      

      // Notifications
      // async fetchNotifications(context) {
      //   try {
      //     const { results, msg } = await (await axios.get(`${apiURL}Notifications`)).data
      //     if (results) {
      //       context.commit('setNotifications', results)
      //     } else {
      //       toast.error(`${msg}`, {
      //         autoClose: 2000,
      //         position: toast.POSITION.BOTTOM_CENTER
      //       })
      //     }
      //   } catch (e) {
      //     toast.error(`${e.message}`, {
      //       autoClose: 2000,
      //       position: toast.POSITION.BOTTOM_CENTER
      //     })
      //   }
      // },
      // async fetchNotification(context, id) {
      //   try {
      //     const { result, msg } = await (await axios.get(`${apiURL}notifications/${id}`)).data
      //     if (result) {
      //       context.commit('setNotification', result)
      //     } else {
      //       toast.error(`${msg}`, {
      //         autoClose: 2000,
      //         position: toast.POSITION.BOTTOM_CENTER
      //       })
      //     }
      //   } catch (e) {
      //     toast.error(`${e.message}`, {
      //       autoClose: 2000,
      //       position: toast.POSITION.BOTTOM_CENTER
      //     })
      //   }
      // },
      // async fetchRecentNotifications(context) {
      //   try {
      //     const { results, msg } = await (await axios.get(`${apiURL}notifications/recent`)).data
      //     if (results) {
      //       context.commit('setRecentNotifications', results)
      //     } else {
      //       toast.error(`${msg}`, {
      //         autoClose: 2000,
      //         position: toast.POSITION.BOTTOM_CENTER
      //       })
      //     }
      //   } catch (e) {
      //     toast.error(`${e.message}`, {
      //       autoClose: 2000,
      //       position: toast.POSITION.BOTTOM_CENTER
      //     })
      //   }
      // },
      // async deleteNotification(context, id) {
      //   try {
      //     const { msg, err } = await (await axios.delete(`${apiURL}notification/${id}`)).data
      //     if (msg) {
      //       context.dispatch('fetchNotification')
      //     } else {
      //       toast.error(`${err}`, {
      //         autoClose: 2000,
      //         position: toast.POSITION.BOTTOM_CENTER
      //       })
      //     }
      //   } catch (e) {
      //     toast.error(`${e.message}`, {
      //       autoClose: 2000,
      //       position: toast.POSITION.BOTTOM_CENTER
      //     })
      //   }
      // },
      
      async fetchMessagesForUser(context) {
        try {
          const legitUser = cookies.get('LegitUser')
          if (legitUser) {
            const { results, msg } = await (await axios.get(`${apiURL}Messages`)).data
            if (results) {
              const userMessages = results.filter(message => message.recipientID === legitUser.result._id)
              context.commit('setMessage', userMessages)
            } else {
              toast.error(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER
              })
            }
          } else {
            toast.error('No user logged in', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      
      // Comments
      async fetchComments(context) {
        try {
          const { results, msg } = await (await axios.get(`${apiURL}Comments`)).data
          if (results) {
            context.commit('setComments', results)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async fetchComment(context, id) {
        try {
          const { result, msg } = await (await axios.get(`${apiURL}Comments/${id}`)).data
          if (result) {
            context.commit('setComment', result)
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      async addComment (context, payload) {
        try { 
          const {data, msg} = await axios.post(`${apiURL}Comments/${payload.commentID}`,  {
            comment: payload.commentText,
            user: payload.userID
          })
          if (data) {
            context.commit('setComment', data)
            toast.success(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          } else{
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        }catch(e){
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

      async updateComment(context, payload) {
        try {
          const { msg, err } = await (await axios.patch(`${apiURL}Comments/${payload.commentID}`, payload)).data
          if (msg) {
            context.dispatch('fetchComments')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async deleteComment(context, id) {
        try {
          const { msg, err } = await (await axios.delete(`${apiURL}Comments/${id}`)).data
          if (msg) {
            context.dispatch('fetchComments')
          } else {
            toast.error(`${err}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER
            })
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },

        
},
modules: {
}
})