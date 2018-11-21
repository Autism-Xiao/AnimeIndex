/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

/**
 * 添加组件的的自定义属性
 * @param WrapComponent 组件
 * @param customProps 默认属性
 * @by  wuxiaoxiao
 */
export const addCustomProps = (WrapComponent, customProps) => {
    const componentRender = WrapComponent.prototype.render;
    const componentDefaultProps = WrapComponent.prototype.constructor.defaultProps;
    WrapComponent.prototype.constructor.defaultProps = {
        ...componentDefaultProps,
        ...customProps
    };
    WrapComponent.prototype.render = function render() {
        const oldProps = this.props;
        this.props = {
            ...this.props,
            style: [customProps.style, oldProps.style]
        };
        return componentRender.apply(this);
    };
};