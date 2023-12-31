// 引入其他类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏控制器,控制其他所有类
class GameControl {
    // 食物
    food: Food
    // 蛇
    snake: Snake
    // 计分牌
    scorePanel: ScorePanel

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = ''
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.food = new Food()
        this.snake = new Snake()
        this.scorePanel = new ScorePanel()

        this.init()
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 调用方法，使蛇移动
        this.run()
    }

    // 创建一个键盘按下的响应函数
    keydownHandler(e: KeyboardEvent) {
        this.direction = e.key
    }

    // 创建一个控制蛇移动的方法
    run() {
        /*
        *   根据方向（this.direction）来使蛇的位置改变
        *       向上 top 减少
        *       向下 top 增加
        *       向左  left 减少
        *       向右  left 增加
        * */
        // 获取蛇现在坐标
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X,Y)

        // 改变蛇的位置
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error:any) {
            // 进入到catch,说明出现了异常，游戏结束，弹出一个提示信息
            alert(error.message)
            // 设置isLive为false
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X === this.food.X && Y === this.food.Y){
            // 食物的位置要进行重置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇要增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl