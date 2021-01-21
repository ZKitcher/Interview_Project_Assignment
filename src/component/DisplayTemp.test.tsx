import React from 'react';
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import DisplayTemp from "./DisplayTemp"

afterEach(cleanup)

it("renders", () => {
	const { asFragment } = render(<DisplayTemp temp={300} format={true} />)
	expect(asFragment()).toMatchSnapshot();
})