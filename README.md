
# Visual Studio Code PDR-ATHENA Support

이 extension은 PDR-Athena 스크립트 언어에 대한 Syntax 하이라이팅과 코드 스니펫을 제공합니다.
단, rAthena 공식 홈페이지에서 제공하는 Syntax가 아닌, PDR Emulator에서 제공하는 Syntax를 기반으로 합니다.

## File extension support

PDR-Athena는 자동으로 파일 확장자를 탐지하며 하이라이팅과 기능을 제공합니다. (.rs, .ers)

혹은 각 파일의 시작 내용이 `//!rathena`, `//!athena`, `//!pdr` 로 시작하는 경우에도 자동으로 감지하여
하이라이팅을 지원합니다.

## Snippets

코드 스니펫은 PDR에서 제공하는 rAthena script 기능을 기준으로 지원합니다.

* `On:` event handler snippet
* `for`, `while`, `do` flow control snippet

## Installation

Visual Studio Code의 확장 메뉴에서 직접 확장을 설치하거나 다음을 방문하여 확장을 설치할 수 있도록 할 예정입니다.


## Contributing

건의사항 및 이슈를 자유롭게 말씀 해주세요. 
이 확장 프로그램의 문법 정의를 계속해서 개선해나갈 수 있습니다.

## License

이 확장자는 MIT 라이센스를 따릅니다.

## Special thanks

이 확장은 처음에 Atom 편집기용 [JoWei's language-athena](https://github.com/JoWei/language-athena)에서 이식되었으며 rAthena Dev Team의 구성원인 secretdataz가 VS Marketplace를 통해 게시했습니다. 이후 rAthena Dev Team의 [vsce-rathena-language-support](https://github.com/rathena/vsce-rathena-language-support)의 rep를 기반으로 확장자를 PDR 환경에 맞게끔 수정하였습니다.
