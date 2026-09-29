package controllers

import "testing"

func TestGreenTransition(t *testing.T) {
	fsm := IntersectionFSM{MinGreenSec: 10, MaxGreenSec: 30, YellowSec: 4}
	fsm.CurrentState = StateGreen
	res := fsm.Transition(35)
	if res != StateYellow {
		t.Errorf("Expected transition to Yellow after MaxGreen, got %v", res)
	}
}
