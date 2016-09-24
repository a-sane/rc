<?php

namespace AppBundle\Admin;

use AppBundle\Entity\Image;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use AppBundle\Form\Type\ImageType;

class ImageAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('imageName')
            ->add('imageType')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {

        $listMapper
            ->add('id')
            ->add('imageName', null, ['template' => 'AppBundle:Admin:list_image.html.twig'])
            ->add('imageType', null, ['template' => 'AppBundle:Admin:list_image_type.html.twig'])
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('imageFile', 'file', array('label' => 'Image', 'required' => false, 'data_class' => 'Symfony\Component\HttpFoundation\File\File'), array('allow_add' => false))
            ->add('imageName', new ImageType(), array('required' => 'false', 'label' => 'Preview'), array('type' => 'image'))
            ->add('imageType', 'choice', [
                'choices' => [
                    Image::TYPE_TEXTURE => 'Texture',
                    Image::TYPE_SECOND_TEXTURE => 'Second Texture',
                    Image::TYPE_LOGO => 'Logo'
                ]
            ])
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('imageName')
            ->add('imageType')
        ;
    }
}
