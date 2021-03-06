import { INIT_PLAYING_QUEUE, UPDATE_PLAYER, RESET_PLAYING_QUEUE } from '../actions/types'

const INITIAL_STATE = { queue: [], wordsAlreadyAppeared: [], currentPlayerIndex: 0 }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_PLAYING_QUEUE: {
      const { teamMembers, words } = action.payload
      const wordsAlreadyAppeared = words.map(word => word.word)
      let { teamA, teamB } = teamMembers

      let wordIndex = 0
      for (let playerIndex = 0; playerIndex < teamA.length; ++playerIndex) {
        teamA[playerIndex].word = words[wordIndex]
        wordIndex++
      }
      for (let playerIndex = 0; playerIndex < teamB.length; ++playerIndex) {
        teamB[playerIndex].word = words[wordIndex]
        wordIndex++
      }

      const iterLength = (teamA.length > teamB.length) ? teamA.length : teamB.length

      let playingQueue = []
      for (let i = 0; i < iterLength; ++i) {
        if (teamA[i]) playingQueue.push(teamA[i])
        if (teamB[i]) playingQueue.push(teamB[i])
      }
      return { ...state, queue: playingQueue, wordsAlreadyAppeared }
    }
    case UPDATE_PLAYER: {
      const { scoreEntry, word } = action.payload
      let playingQueue = [ ...state.queue ]
      let player = playingQueue[state.currentPlayerIndex]
      player = { ...player, score: [...player.score, scoreEntry], word }
      const wordsAlreadyAppeared = [ ...state.wordsAlreadyAppeared, word.word ]
      playingQueue.push(player)
      return {
        ...state,
        queue: playingQueue,
        wordsAlreadyAppeared,
        currentPlayerIndex: state.currentPlayerIndex + 1
      }
    }
    case RESET_PLAYING_QUEUE: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
