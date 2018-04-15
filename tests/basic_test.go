package tests

import (
	"testing"
	"io"
	. "gopkg.in/check.v1"
	. "go-ci-test/util"
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type MySuite struct{}

var _ = Suite(&MySuite{})

func (s *MySuite) TestHelloWorld(c *C) {
	c.Assert(42, Equals, 42)
	c.Assert(io.ErrClosedPipe, ErrorMatches, "io: .*on closed pipe")
}

func (s *MySuite) TestReturn60(c *C) {
	c.Assert(Return60(), Equals, 60)
}
