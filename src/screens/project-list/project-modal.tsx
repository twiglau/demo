import { Drawer, Button } from "antd"
import { useProjectModel } from "hooks/project"


export const ProjectModal = () => {
    const {modalOpen, close} = useProjectModel()
    return (
        <Drawer
        onClose={close}
        open={modalOpen}
        width={'100%'}
        >
            <h1>Project Model</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    )
}