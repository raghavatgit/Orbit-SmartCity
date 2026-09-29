package controllers

type LightState int

const (
	StateRed LightState = iota
	StateGreen
	StateYellow
)

type IntersectionFSM struct {
	CurrentState LightState
	MinGreenSec  int
	MaxGreenSec  int
	YellowSec    int
}

func (fsm *IntersectionFSM) Transition(elapsedSec int) LightState {
	switch fsm.CurrentState {
	case StateGreen:
		if elapsedSec >= fsm.MaxGreenSec {
			fsm.CurrentState = StateYellow
		}
	case StateYellow:
		if elapsedSec >= fsm.YellowSec {
			fsm.CurrentState = StateRed
		}
	case StateRed:
		fsm.CurrentState = StateGreen
	}
	return fsm.CurrentState
}
