<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;

class ImageType extends AbstractType
{
    public function getParent()
    {
        return 'text';
    }

    public function getName()
    {
        return 'image';
    }
}