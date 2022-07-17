import { CommandType } from "../../command";
import baiduCommand from "./baiduCommand";
import baidudevCommand from "./baidudevCommand";
import bilibiliCommand from "./bilibiliCommand";
import bingCommand from "./bingCommand";
import codenavCommand from "./codenavCommand";
import doubanCommand from "./doubanCommand";
import douyinCommand from "./douyinCommand";
import githubCommand from "./githubCommand";
import googleCommand from "./googleCommand";
import wangyiyunCommand from "./wangyiyunCommand";
import zhihuCommand from "./zhihuCommand";
import gengCommand from "./gengCommand";

/**
 * 搜索源
 */
const fromDict: Record<string, CommandType> = {
  baidu: baiduCommand,
  baidudev: baidudevCommand,
  bilibili: bilibiliCommand,
  bing: bingCommand,
  codenav: codenavCommand,
  douban: doubanCommand,
  douyin: douyinCommand,
  github: githubCommand,
  google: googleCommand,
  wangyiyun: wangyiyunCommand,
  zhihu: zhihuCommand,
  geng: gengCommand,
};

/**
 * 搜索命令
 * @author yupi
 */
const searchCommand: CommandType = {
  func: "search",
  alias: ["s", "sousuo", "sou", "query"],
  params: [
    {
      key: "word",
      required: true,
    },
  ],
  options: [
    {
      // 来源
      key: "from",
      alias: ["f"],
      type: "string",
      defaultValue: "baidu",
    },
    {
      // 当前页面打开
      key: "self",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  // 默认使用百度搜索
  action: (options, terminal) => {
    const { from = "baidu" } = options;
    // 执行不同搜索源的搜索方法
    const fromObj = fromDict[from];
    if (!fromObj) {
      terminal.writeTextErrorResult("找不到搜索源");
      return;
    }
    return fromObj.action(options, terminal);
  },
};

export default [searchCommand, ...Object.values(fromDict)];
