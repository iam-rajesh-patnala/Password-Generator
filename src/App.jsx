import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
	const [length, setLength] = useState(8);
	const [numbersAllowed, setNumbersAllowed] = useState(false);
	const [symbolsAllowed, setSymbolsAllowed] = useState(false);
	const [password, setPassword] = useState("");
	const passwordRef = useRef(null);

	const generatePassword = useCallback(() => {
		let generatedPassword = "";

		let alphaStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let numStr = "0123456789";
		let symbolStr = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

		if (numbersAllowed) {
			alphaStr += numStr;
		}
		if (symbolsAllowed) {
			alphaStr += symbolStr;
		}

		for (let count = 0; count < length; count++) {
			generatedPassword += alphaStr.charAt(
				Math.floor(Math.random() * alphaStr.length)
			);
		}

		setPassword(generatedPassword);
	}, [length, numbersAllowed, symbolsAllowed]);

	useEffect(() => {
		generatePassword();
	}, [length, numbersAllowed, symbolsAllowed, generatePassword]);

	const copyPasswordToClipBoard = () => {
		window.navigator.clipboard.writeText(password);
		passwordRef.current?.select();
	};

	return (
		<div className="bg-container">
			<div className="password-generator-container">
				<h1 className="title">Password Generator</h1>
				{/* Password Input */}
				<div className="password-input-container">
					<input
						type="text"
						name="password"
						id="password"
						value={password}
						className="password-input"
						placeholder="Password"
						readOnly
						ref={passwordRef}
					/>
					<button
						className="copy-btn"
						onClick={copyPasswordToClipBoard}
					>
						Copy
					</button>
				</div>

				{/* Options Container */}
				<div className="options-container">
					{/* Length Slider */}
					<div className="slider-container">
						<label htmlFor="range">Length: {length}</label>
						<input
							type="range"
							id="range"
							min={8}
							max={20}
							value={length}
							className="length-slider"
							onChange={(e) => setLength(Number(e.target.value))} // Convert to number
						/>
					</div>

					{/* Checkbox for Numbers */}
					<div>
						<input
							type="checkbox"
							checked={numbersAllowed} // Use `checked` for controlled input
							id="numbers"
							className="checkbox"
							onChange={() => setNumbersAllowed((prev) => !prev)}
						/>
						<label htmlFor="numbers">Include Numbers</label>
					</div>

					{/* Checkbox for Symbols */}
					<div>
						<input
							type="checkbox"
							checked={symbolsAllowed} // Use `checked` for controlled input
							id="symbols"
							className="checkbox"
							onChange={() => setSymbolsAllowed((prev) => !prev)}
						/>
						<label htmlFor="symbols">Include Symbols</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
