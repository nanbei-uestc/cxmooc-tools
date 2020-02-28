import { TaskFactory, Task } from "./task";
import { CssBtn } from "./utils";
import { createBtn } from "@App/internal/utils/utils";

export class TopicFactory implements TaskFactory {
    protected taskIframe: HTMLIFrameElement;
    protected task: Topic
    CreateTask(context: any, taskinfo: any): Task {
        this.taskIframe = (<Window>context).document.querySelector(
            "iframe[jobid='" + taskinfo.jobid + "']"
        );
        this.createActionBtn();
        this.task = new Topic(this.taskIframe.contentWindow, taskinfo);
        return this.task;
    }

    protected createActionBtn() {
        let prev = <HTMLElement>this.taskIframe.previousElementSibling;
        prev.style.textAlign = "center";
        prev.style.width = "100%";
        let topic = CssBtn(createBtn("搜索题目", "点击开始自动答题", "cx-btn"));
        prev.append(topic);
        // 绑定事件
        topic.onclick = () => {
            this.task.Start();
        };
    }
}

export class Topic extends Task {
    public Start(): void {
    }
}
