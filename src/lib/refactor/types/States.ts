export enum PlayerState{
    IDLE,
    TURN_START,
    EVAL_PILE,
    EVAL_DISCARD,
    EVAL,
    HAB_CHOICE,
    HAB_START,
    HAB_PREPARING,
    HAB_EXECUTE,
    TURN_END,
    GAME_END,
    WAIT
}

export enum GameState{
    LOAD,
    DEAL,
    SPY,
    RUNNING,
    STOP_REQUEST,
    ENDED
}