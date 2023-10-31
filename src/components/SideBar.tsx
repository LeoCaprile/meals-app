import Link from "./Link";

export function SideBar() {
	return (
		<aside
			id="default-sidebar"
			class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
				<ul class="space-y-2 mt-20 font-medium">
					<li>
						<Link
							href="/dashboard"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<div class="i-material-symbols-space-dashboard-rounded text-2xl"></div>
							<span class="ml-3">Dashboard</span>
						</Link>
					</li>
					<li class="group">
						<Link
							href="/user/profile"
							class=" flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							<div class="i-material-symbols-account-circle text-2xl"></div>

							<span class="flex-1 ml-3 text-left whitespace-nowrap">
								Profile
							</span>
						</Link>
					</li>

					<li>
						<a
							href="#"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<div class="i-material-symbols-supervisor-account text-2xl"></div>
							<span class="flex-1 ml-3 whitespace-nowrap">Users</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<div class="i-material-symbols-shopping-bag text-2xl"></div>

							<span class="flex-1 ml-3 whitespace-nowrap">Products</span>
						</a>
					</li>
					<li>
						<a
							href="/api/auth/signout"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<div class="i-material-symbols-exit-to-app text-2xl"></div>
							<span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
	);
}
