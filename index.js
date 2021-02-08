var tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '142',
        width: '254',
        videoId: '9znsfkJk4Ac',
        events: {
            'onStateChange': onPlayerStateChange
        }
    })
}


var done = false

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(function () {
            player.pauseVideo()
            document.getElementById('app').hidden = false
            document.getElementById('video').hidden = true
            nextQuestion()
        }, 5000)
        done = true
    }
}

var questionIndex = 0
var time = 0
function choose(questionId) {
    var answer = document.getElementById('answer' + questionId)
    var answers = answer.parentElement.children
    for(var i = 1; i < 5; i++) {
        if(answers[i] !== answer) answers[i].style.backgroundColor = 'rgb(108 117 125)'
    }
    answer.style.backgroundColor = 'rgb(255 193 7)'
    answer.style.color = 'black'
    setTimeout(function() {
        if(questionId === 11 || questionId === 21 || questionId === 31) {
            answer.style.backgroundColor = 'rgb(40 167 69)'
        } else {
            answer.style.backgroundColor = 'rgb(220 53 69)'
        }
        answer.style.color = 'white'
        setTimeout(function () {
            document.getElementById('question' + questionIndex).hidden = true
            if(questionId === 11 || questionId === 21 || questionId === 31) {
                time += 10
                document.getElementById('accumulatedTime').textContent = 'Accumulated time: ' + time + ' minutes'
                document.getElementById('success').hidden = false
                changeBackground(MODE_SUCCESS)
            } else {
                document.getElementById('error').hidden = false
                changeBackground(MODE_ERROR)
            }

            for(var i = 1; i < 5; i++) {
                answers[i].style.backgroundColor = 'rgb(108 117 125)'
            }
        }, 200)
    }, 500)


}

function unlock() {
    changeBackground(MODE_VIDEO)
    document.getElementById('app').hidden = true
    document.getElementById('video').hidden = false
}

function success () {
    document.getElementById('success').hidden = true
    nextQuestion()
}

function error () {
    document.getElementById('error').hidden = true
    nextQuestion()
}

function nextQuestion() {
    questionIndex++
    document.getElementById('question' + questionIndex).hidden = false
    changeBackground(MODE_QUESTION)
}

function restart() {
    time = 0
    questionIndex = 0
    done = false
    player.stopVideo()

    changeBackground(MODE_VIDEO)

    document.getElementById('question1').hidden = false
    document.getElementById('video').hidden = false

    document.getElementById('app').hidden = true
    document.getElementById('question2').hidden = true
    document.getElementById('question3').hidden = true
    document.getElementById('success').hidden = true
    document.getElementById('error').hidden = true
}

var MODE_VIDEO = 'video'
var MODE_QUESTION = 'question'
var MODE_SUCCESS = 'success'
var MODE_ERROR = 'error'
function changeBackground(mode) {
    var background = document.getElementById('background')
    switch (mode) {
        case MODE_VIDEO: {
            background.style.backgroundColor = 'black'
            background.style.backgroundImage = ''
            background.style.backgroundSize = ''
            background.style.backgroundRepeat = ''
            background.style.backgroundPosition = ''
            break
        }
        case MODE_QUESTION: {
            background.style.backgroundImage = 'url("question-background.jpg")'
            background.style.backgroundSize = 'cover'
            background.style.backgroundRepeat = 'no-repeat'
            background.style.backgroundPosition = ''
            break
        }
        case MODE_SUCCESS: {
            background.style.backgroundImage = 'url("success-background.jpg")'
            background.style.backgroundSize = 'contain'
            background.style.backgroundRepeat = 'no-repeat'
            background.style.backgroundPosition = 'bottom'
            background.style.backgroundColor = 'white'
            break
        }
        case MODE_ERROR: {
            background.style.backgroundImage = 'url("error-background.jpg")'
            background.style.backgroundSize = 'cover'
            background.style.backgroundRepeat = 'no-repeat'
            background.style.backgroundPosition = ''
            break
        }
    }

}