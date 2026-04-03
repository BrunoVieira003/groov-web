const noSongPhrases = [
    "Seems like it's quiet",
    "Why so quiet? Put something on",
    "We're not in space, you can hear anything you want",
    "I'm starting to think the band will not show up...",
    "Some songs are waiting to be played",
    "What are you waiting for? Put your records on",
    "Not saying much is only enough when you're already listening",
    "First things first, play some song",
    "Just doing some tests, could you play some song for me?",
    "We are [Copyrighted] and we're here to make you think about [Censored] and get sad and stuff!"
]

export function randomNoSongPhrases(){
    const randomIndex = Math.floor(Math.random() * noSongPhrases.length)
    return noSongPhrases[randomIndex]
}