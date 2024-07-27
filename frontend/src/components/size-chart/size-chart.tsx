const SizeChart: React.FC = () => {
	return (
		<div className="overflow-hidden bg-white mx-auto w-full py-2 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<p className="text-sm md:text-2xl font-bold text-black mt-2 mb-8 sm:mb-10">
					Size and packaging guidelines
				</p>
			</div>
			<div className="overflow-x-auto">
				<table className="table-auto border-collapse border border-gray-400 border-dashed">
				<thead>
					<tr className="bg-gray-200">
					<th className="border border-gray-400 border-dashed px-4 py-2">Bat Size</th>
					<th className="border border-gray-400 border-dashed px-4 py-2">Player’s Height</th>
					<th className="border border-gray-400 border-dashed px-4 py-2">Handle</th>
					<th className="border border-gray-400 border-dashed px-4 py-2">Bat Face Width (mm)</th>
					<th className="border border-gray-400 border-dashed px-4 py-2">Total Length (in)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">4</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">4'9"-4'11"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">9½</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">95-97</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">29½</td>
					</tr>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">5</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">4'11"-5'2"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">10</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">100-102</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">30½</td>
					</tr>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">6</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">5'2"-5'6"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">10½</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">100-102</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">31¼</td>
					</tr>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">Harrow</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">5'6"-5'8"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">11</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">101-104</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">32¾</td>
					</tr>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">Short Handle (SH)</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">5'8"-6'2"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">11½</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">105-108</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">33½</td>
					</tr>
					<tr>
					<td className="border border-gray-400 border-dashed px-4 py-2">Long Handle (LH)</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">over 6'2"</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">12¼</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">105-108</td>
					<td className="border border-gray-400 border-dashed px-4 py-2">34¼</td>
					</tr>
				</tbody>
				</table>
			</div>
			<div className="m-4 text-sm text-gray-600 italic flex flex-col text-center">
				<p className="m-0">*Product may vary, after all, it is handcrafted.</p>
				<p className="m-0">*Length is in Inches.</p>
			</div>
		</div>


	);
};

export default SizeChart;
