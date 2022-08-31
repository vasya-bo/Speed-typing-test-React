export const initialStateText = {
  Right: '', inProcess: '', notDone: '', numberAll: 0, numberRight: 0, numberWrong: 0,
};

export function textReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        numberAll: action.payload.dataArray.length + 1,
        inProcess: action.payload.firstLetter,
        notDone: action.payload.dataArray.join(''),
      };
    case 'RIGHT_LETTER':
      return {
        ...state,
        Right: state.Right + state.inProcess,
        inProcess: action.payload.firstLetter,
        notDone: action.payload.dataArray.join(''),
        numberRight: state.numberRight + 1,
      };
    case 'WRONG_LETTER':
      return {
        ...state, numberWrong: state.numberWrong + 1,
      };
    case 'NEW_GAME': return { ...initialStateText };
    default: throw new Error();
  }
}
