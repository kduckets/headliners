import React, { Component } from 'react'
import { styles } from 'refire-app'
import { Card } from 'elemental'
import LockIcon from 'react-icons/lib/fa/lock'

import ReplyToThread from './ReplyToThread'
import Posts from './Posts'
import ShowPagination from './ShowPagination'
import DeleteDialog from './DeleteDialog'
import LockDialog from './LockDialog'
import DeletePostDialog from './DeletePostDialog'
import TopToolbar from './TopToolbar'
import DeleteButton from './DeleteButton'
import LockButton from './LockButton'
import NewsImage from './NewsImage'
import Scoreboard from './Scoreboard'

class Thread extends Component {

  render() {
    const {
      threadKey,
      thread,
      posts,
      settings,
      pagedPosts,
      user,
      isAdmin,
      styles,
      theme,
      state: {
        currentPage,
        deleteDialogVisible,
        deletePostDialogVisible,
        lockDialogVisible,
        postKey,
        quote,
      },
      stateSetters: {
        deletePost,
        deleteThread,
        handlePageSelect,
        hideDeleteDialog,
        hideDeletePostDialog,
        hideLockDialog,
        selectLastPage,
        showDeleteDialog,
        showDeletePostDialog,
        showLockDialog,
        toggleLocked,
        updateQuote,
        toggleUpvote,
        saveEditedPost,
      },
    } = this.props
    const { THREAD_PAGE_SIZE, THREAD_PAGE_LIMIT } = settings
    const locked = thread.locked

      ? <LockIcon size="22px" />
      : <span />
    const scores = [0,0]
        posts.forEach(post => {
          if(post.value && post.value.likes) {
          scores.push({
            key: post.key,
            score: Object.keys(post.value.likes).length,
        })
      }
        })  
                            
      function getMax(obj) {
        return Math.max.apply(null,Object.keys(obj))
          }
       let topComment = "No top headline yet"
       if(scores) {   
       const highScoreIndex = getMax(scores)
       const highScoreKey = scores[highScoreIndex].key
   
       getTopComment()

       function getTopComment() {
        posts.forEach(post => {
        if(post.key === highScoreKey) {
          console.log(post.value.body)
          topComment = post.value.body
          return post.value.body
        } else { return "No top headline yet"}
      })
    }
    }
 
    return (
      <div>
        <NewsImage/>
        <DeleteDialog
          visible={deleteDialogVisible}
          hide={hideDeleteDialog}
          save={deleteThread}
          title={thread.title}
          styles={theme.DeleteDialog}
        />
        <LockDialog
          visible={lockDialogVisible}
          hide={hideLockDialog}
          save={toggleLocked}
          title={thread.title}
          locked={thread.locked}
          styles={theme.LockDialog}
        />
        <DeletePostDialog
          visible={deletePostDialogVisible}
          hide={hideDeletePostDialog}
          save={deletePost}
          styles={theme.DeletePostDialog}
        />
        <Card className={styles.container}>
          <div className={styles.paginationContainer}>
            <div className={styles.headerContainer}>
              <div className={styles.lockContainer}>
                {locked}
              </div>
              <h2 className={styles.header}>
                "{topComment}"
              </h2>
            </div>
            <TopToolbar
              isAdmin={isAdmin}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}>
              <ShowPagination
                currentPage={currentPage}
                handlePageSelect={handlePageSelect}
                posts={posts}
                pageSize={THREAD_PAGE_SIZE}
                pageLimit={THREAD_PAGE_LIMIT}
              />
              <div className={styles.buttonsContainer}>
                <DeleteButton
                  visible={isAdmin}
                  confirmDelete={showDeleteDialog}
                />
                <LockButton
                  visible={isAdmin}
                  locked={thread.locked}
                  confirmLockedChange={showLockDialog}
                />
              </div>
            </TopToolbar>
          </div>
          <Posts
            posts={pagedPosts}
            deletePost={showDeletePostDialog}
            updateQuote={updateQuote}
            toggleUpvote={toggleUpvote}
            saveEditedPost={saveEditedPost}
            user={user}
            locked={thread.locked}
            isAdmin={isAdmin}
            theme={theme}
          />
          <div className={styles.paginationContainer}>
            <ShowPagination
              currentPage={currentPage}
              handlePageSelect={handlePageSelect}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}
              pageLimit={THREAD_PAGE_LIMIT}
            />
          </div>
        </Card>

        <ReplyToThread
          user={user}
          threadKey={threadKey}
          postKey={postKey}
          quote={quote}
          locked={thread.locked}
          selectLastPage={selectLastPage}
          styles={theme.ReplyToThread}
          theme={theme}
        />

        <Scoreboard
          theme={theme}
          />
      </div>
    )
  }
}

const css = {
  container: {},
  header: {
    minHeight: "28px",
    margin: "0em 0 1em 0",
    textAlign: "center",
    display: "inline-block",
  },
  lockContainer: {
    display: "inline-block",
    verticalAlign: "top",
    paddingTop: "4px",
    paddingRight: "5px",
  },
  paginationContainer: {
    position: "relative",
    minHeight: "32px",
  },
  buttonsContainer: {
    display: "inline-block",
  },
}

export default styles(css, Thread)
