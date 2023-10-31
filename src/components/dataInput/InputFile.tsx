interface InputFileProps {
	accept?: string;
	multiple?: string;
	label: string;
	name: string;
}

const InputFile = ({ name, label, accept, multiple }: InputFileProps) => {
	return (
		<div class="my-2">
			<label
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				for={name}
			>
				{label}
			</label>
			<input
				class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:mr-2 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
				id={name}
				type="file"
				accept={accept}
				multiple={multiple ?? "false"}
			/>
		</div>
	);
};

export default InputFile;
