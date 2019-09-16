// 用户管理
export const state = () => {
    return {
        // 评论回复存的上一级对象
        followObj:{},
        // 文章草稿数组
        draftPost:[],
        // 当前草稿文章
        // nowDraft:{}
    }
}

export const mutations = {
    // 存放评论回复上一级对象的方法
    setFollowObj(state, obj){
        // 把文章草稿添加到数组
        state.followObj = obj
    },
    // 修改文章草稿
    setDraftPost(state, draft){
        // 把文章草稿添加到数组
        state.draftPost.push(draft)
    },
    // 删除文章草稿
    DraftPost(state, draft){
        state.draftPost = draft;
    }, 
    // 修改当前草稿
    setNowDraft(state,Draft){
        state.draftPost = Draft;
    }
};
