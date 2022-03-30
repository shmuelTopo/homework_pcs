import $ from 'jquery';
import './style.css';

async function getUsers() {    
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await r.json();
        if(!r.ok) throw Error(r.statusText);
        return data;
    } catch(e){
        console.error(e);
    }
    
}

async function getPosts(userId) {    
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
        const data = await r.json();
        if(!r.ok) throw Error(r.statusText);
        return data;
    } catch(e){
        console.error(e);
    }
}

async function getComments(postId) {    
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId);
        const data = await r.json();
        if(!r.ok) throw Error(r.statusText);
        return data;
    } catch(e){
        console.error(e);
    }
}

async function updateTheUsers() {
    const theUsers = await getUsers();
    console.log(theUsers[0]);
    const users = theUsers.map(user => {
        return {
            name: user.name,
            id: user.id,
            email: user.email,
            web: user.website,
            company: user.company.name,
            comCatch: user.company.catchPhrase,
            comBs: user.company.bs
        }
    });

    users.forEach(user => {
        $('#users').append(`
        <div userId="${user.id}" class="userDetails bg-gray-200 hover:bg-gray-300 m-0 my-1 p-4 md:m-4 rounded-xl cursor-pointer"> 
            <div class="text-lg italic">${user.name}</div>
            <a class="text-blue-700 font-bold">www.${user.web}</a>
            <div>${user.email}</div>
            <div class="text-xs text-slate-600">
                <div>${user.company}</div>
                <div>${user.comCatch}</div>
                <div>${user.comBs}</div>
            </div> 
        </div>`);
    });

    const userClicked = async (e) => {
        console.log(e.target.closest('.userDetails').getAttribute('userId'));
        $('#users').addClass('hidden');
        $('#posts').removeClass('hidden');
        $('#posts').empty();
        const userId = e.target.closest('.userDetails').getAttribute('userId');
        const thePosts = await getPosts(userId);
        const posts = thePosts.map(post => {
            return {
                id: post.id,
                title: post.title,
                body: post.body
            }
        })
        const user = users[userId - 1];
        $('h2').text(user.name);

        posts.forEach(post => {
            $('#posts').append(`
            <figure id=${post.id} class="comment flex flex-col justify-between bg-blue-100 rounded-xl p-8 text-left space-y-4">
                <blockquote>
                    <p class="text-xl font-bold">${post.title}</p>
                    <p class="text-lg font-medium">
                        "${post.body}"
                    </p>
                </blockquote>
                <figcaption class="font-medium">
                    <div class="text-sky-500 dark:text-sky-400">
                        ${user.name}
                    </div>
                    <div class="text-slate-700 dark:text-slate-500">
                        ${user.email}
                    </div>

                </figcaption>
                <div>
                    <div id="comments-${post.id}" class="commentDiv hidden"></div>
                    <button id="commentBtn" type="button" class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 font-small rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Show Comments</button>
                </div>
            </figure>
            `);
        });
    }

    const commentClicked = async (e) => {
        const postId = e.target.closest('.comment').getAttribute('id');

        if($(e.target).text() === 'Show Comments'){
            const comments = await getComments(postId);
            comments.forEach(comment => {
                $(`#comments-${postId}`).append(`
                <div class="comment flex flex-col justify-between bg-blue-100 rounded-xl mb-3 px-8 text-left space-y-4">
                    <figcaption class="font-medium">
                        <p class="text-lg font-bold">${comment.name}</p>
                        <div class="text-slate-700 dark:text-slate-500">
                            ${comment.body}
                        </div>  
                        <div class="text-sky-500 dark:text-sky-400">
                            ${comment.email}
                        </div>
                    </figcaption>
                    <div class="w-full my-3 bg-blue-900 h-px"></div>
                </div>
                `);
            });

            $(`#comments-${postId}`).slideDown(1000);
            e.target.textContent = 'Hide Comments';
        } else {
            $(`#comments-${postId}`).slideUp(200);
            $(e.target).text('Show Comments');
        }
    }

    $('#users').on('click', '.userDetails', userClicked);

    $('#posts').on('click', 'button', commentClicked);

}

$('#showUsers').on('click',() => {
    $('h2').text('Users');
    $('#users').removeClass('hidden');
    $('#posts').addClass('hidden');
});

updateTheUsers();
