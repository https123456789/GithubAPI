{ pkgs }: {
	deps = [
		pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
		pkgs.neovim
		pkgs.emscripten
		pkgs.unixtools.ping
		pkgs.busybox
		pkgs.gh
		pkgs.python39Full
	];
}