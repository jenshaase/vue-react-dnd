import DustbinSingleTargetContainer from './examples/Dustbin/SingleTarget/Container'
import DustbinSingleTargetInFrameContainer from './examples/Dustbin/SingleTargetInFrame/Container'
import DustbinCopyOrMoveContainer from './examples/Dustbin/CopyOrMove/Container'
import DustbinMultipleTargetsContainer from './examples/Dustbin/MultipleTargets/Container'
import DragAroundNavieContainer from './examples/DragAround/Naive/Container'
import DragAroundCustomDragLayerContainer from './examples/DragAround/CustomDragLayer/Container'
import NestingDragSourcesContainer from './examples/Nesting/DragSources/Container'
import NestingDropTargetsContainer from './examples/Nesting/DropTargets/Container'
import SortableSimpleContainer from './examples/Sortable/Simple/Container'
import SortableCancelOnDropOutsideContainer from './examples/Sortable/CancelOnDropOutside/Container'
import PageHome from './pages/Home'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome
    },
    {
        path: '/example/dustbin/single-target',
        name: 'example/dustbin/single-target',
        component: DustbinSingleTargetContainer
    },
    {
        path: '/example/dustbin/single-target-in-frame',
        name: 'example/dustbin/single-target-in-frame',
        component: DustbinSingleTargetInFrameContainer
    },
    {
        path: '/example/dustbin/copy-or-move',
        name: 'example/dustbin/copy-or-move',
        component: DustbinCopyOrMoveContainer
    },
    {
        path: '/example/dustbin/multiple-targets',
        name: 'example/dustbin/multiple-targets',
        component: DustbinMultipleTargetsContainer
    },

    {
        path: '/example/drag-around/naive',
        name: 'example/drag-around/naive',
        component: DragAroundNavieContainer
    },
    {
        path: '/example/drag-around/custom-drag-layer',
        name: 'example/drag-around/custom-drag-layer',
        component: DragAroundCustomDragLayerContainer
    },

    {
        path: '/example/nesting/drag-sources',
        name: 'example/nesting/drag-sources',
        component: NestingDragSourcesContainer
    },
    {
        path: '/example/nesting/drop-targets',
        name: 'example/nesting/drop-targets',
        component: NestingDropTargetsContainer
    },

    {
        path: '/example/sortable/simple',
        name: 'example/sortable/simple',
        component: SortableSimpleContainer
    },
    {
        path: '/example/sortable/cancel-on-drop-outside',
        name: 'example/sortable/cancel-on-drop-outside',
        component: SortableCancelOnDropOutsideContainer
    },
]
