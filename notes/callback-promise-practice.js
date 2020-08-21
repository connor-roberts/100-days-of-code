// * DATA

const users = [{
    email: "mike@mike.com",
    userID: 1234
},{
    email: "dave@dave.com",
    userID: 5678
},{
    email: "tony@tony.com",
    userID: 9012
}]

const posts = [{
    userID: 1234,
    posts: ["Post 1", "Post 2", "Post 3"]
},{
    userID: 5678,
    posts: ["Post 4", "Post 5"]
},{
    userID: 9012,
    posts: ["Post 6"]
}]

// * CALLBACK

console.log("start")

function getUserID(email, callback) {
    setTimeout(() => {
        callback(email)
    }, 2000)
}

function getUserPosts(id, callback) {
    setTimeout(() => {
        callback(id)
    }, 2000)
}

function getNumberOfPosts(posts, callback) {
    setTimeout(() => {
        callback(posts)
    }, 2000)
}

getUserID("mike@mike.com", (email) => {
    const userObj = users.find((user) => {
        return user.email === email
    })
    console.log(userObj.userID)
    getUserPosts(userObj.userID, (id) => {
        const userPosts = posts.find((post) => {
            return post.userID === id
        })
        console.log(userPosts.posts)
        getNumberOfPosts(userPosts, (posts) => {
            console.log(`Post count: ${userPosts.posts.length}`)
        })
    })
})

console.log("finish")

// * PROMISE

console.log("start")

function getUserID(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userObj = users.find((user) => {
                return user.email === email
            })
            resolve(userObj)
        }, 2000)
    })
}

function getUserPosts(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userPosts = posts.find((post) => {
                return post.userID === id
            })
            resolve(userPosts)
        }, 2000)
    })
}

function getNumberOfPosts(userPosts) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postCount = userPosts.posts.length
            resolve(postCount)
        }, 2000)
    })
}

getUserID("tony@tony.com")
    .then((userObj) => getUserPosts(userObj.userID))
    .then((userPosts) => getNumberOfPosts(userPosts))
    .then((postCount) => console.log(postCount))

console.log("finish")
